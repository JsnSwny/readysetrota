import React, { useState, useCallback, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { getTimeclock, resetTimeclock } from "../../actions/timeclock";
import { useDispatch } from "react-redux";
import { resetErrors } from "../../actions/errors";
import { updateShift } from "../../actions/shifts";
import { logout } from "../../actions/auth";
import { Redirect } from "react-router";

const Timeclock = () => {
  const [pin, setPin] = useState({});
  const [activeInput, setActiveInput] = useState(0);
  const [showText, setShowText] = useState(false);
  let success = useSelector((state) => state.errors.success);
  const autoFocus = useCallback((el) => (el ? el.focus() : null), []);
  const dispatch = useDispatch();
  const shifts = useSelector((state) => state.timeclock.shifts);
  const employee = useSelector((state) => state.timeclock.employee);
  const current = useSelector((state) => state.employees.current);
  const sites = useSelector((state) => state.employees.sites);
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading);
  const permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    if (e.target.value < 10) {
      setActiveInput(activeInput + 1);
      setPin({ ...pin, [e.target.id]: e.target.value });
    }
  };
  const [currentSite, setCurrentSite] = useState("");

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (current.site && current.site.id) {
      if (permissions.includes("manage_shifts")) {
        localStorage.setItem("timeclock_site", current.site.id);
        if (!loading.sites && auth.isAuthenticated) {
          dispatch(logout());
        }
      }
    }
    setCurrentSite(localStorage.getItem("timeclock_site"));
  }, [current, auth.user]);

  const handleFocus = (e) => {
    setActiveInput(parseInt(e.target.id));
  };

  useEffect(() => {
    let pinValues = Object.values(pin);
    if (pinValues.filter((item) => item != "").length == 4) {
      dispatch(getTimeclock(pinValues, currentSite));
    }
  }, [pin]);

  useEffect(() => {
    if (success) {
      dispatch(resetErrors());
    }
  }, [success]);

  if (current.site && current.site.id) {
    console.log(permissions);
    if (!permissions.includes("manage_shifts")) {
      return <Redirect to="/" />;
    }
  }

  return (
    <Fragment>
      {employee && (
        <div className={`text-overlay-container ${showText ? "show" : ""}`}>
          <div className={`text-overlay ${showText ? "show" : ""}`}>
            <i className="fas fa-thumbs-up"></i>
            <p>{message}</p>
          </div>
        </div>
      )}

      <div className="timeclock">
        <div className="wrapper--sm">
          {/* <img className="timeclock__logo" src="/static/media/logo-3.svg" /> */}
          <h1 className="timeclock__title">
            {format(new Date(), "cccc do MMMM")}
          </h1>
          <h2 className="timeclock__time">{format(time, "HH:mm:ss")}</h2>
          {employee ? (
            <p className="timeclock__subtext">
              Hi {employee.first_name}, here are your shifts for today:
            </p>
          ) : (
            <p className="timeclock__subtext">Enter your PIN:</p>
          )}
          {!employee && (
            <div className="pins">
              {[...Array(4)].map((e, i) => (
                <Fragment>
                  <input
                    type="number"
                    max="9"
                    min="0"
                    onChange={handleChange}
                    onClick={handleFocus}
                    onKeyDown={(e) => {
                      if (e.keyCode == 8) {
                        if (activeInput == 0) {
                          setPin({ ...pin, [activeInput]: "" });
                        } else {
                          setPin({ ...pin, [activeInput - 1]: "" });
                          setActiveInput(activeInput - 1);
                        }
                      }
                    }}
                    id={i}
                    ref={i === activeInput ? autoFocus : undefined}
                    value={pin[i] ? pin[i] : ""}
                    className="pins__pin input-password"
                  />
                </Fragment>
              ))}
            </div>
          )}

          <div className="timeclock__shifts">
            {employee && shifts.length == 0 && (
              <p>There are no shifts to show</p>
            )}
            {shifts.map((item) => {
              let start_date = new Date().setHours(
                item.start_time.substr(0, 2),
                item.start_time.substr(3, 2),
                0
              );
              let end_date = new Date().setHours(
                item.end_time.substr(0, 2),
                item.end_time.substr(3, 2),
                0
              );
              return (
                <div className="timeclock__shift">
                  <div className="timeclock__shift-time">
                    {format(start_date, "HH:mmaaa")} -{" "}
                    {format(end_date, "HH:mmaaa")}
                  </div>
                  {item.timeclock.stage != "CLOCKED_OUT" && (
                    <button
                      onClick={() => {
                        setShowText(true);
                        if (item.timeclock.stage == "DEFAULT") {
                          setMessage(
                            `Welcome ${employee.first_name}, you have clocked in!`
                          );
                        } else if (item.timeclock.stage == "CLOCKED_IN") {
                          setMessage(
                            `Goodbye ${employee.first_name}, you have clocked out!`
                          );
                        }
                        const shiftObj = {
                          date: item.date,
                          start_time: item.start_time,
                          timeclock: {
                            clock_in:
                              item.timeclock.stage == "DEFAULT"
                                ? format(new Date(), "HH:mm")
                                : item.timeclock.clock_in,
                            clock_out:
                              item.timeclock.stage == "CLOCKED_IN"
                                ? format(new Date(), "HH:mm")
                                : item.timeclock.clock_out,
                            employee_id: employee.id,
                            stage:
                              item.timeclock.stage == "DEFAULT"
                                ? "CLOCKED_IN"
                                : item.timeclock.stage == "CLOCKED_IN"
                                ? "CLOCKED_OUT"
                                : "CLOCKED_OUT",
                          },
                        };
                        dispatch(updateShift(item.id, shiftObj));
                        setTimeout(() => {
                          setShowText(false);
                          dispatch(resetTimeclock());
                          setActiveInput(0);
                          setPin({});
                        }, 4000);
                      }}
                      className={`btn-3 ${item.timeclock.stage.toLowerCase()}`}
                    >
                      {item.timeclock.stage == "DEFAULT"
                        ? `Clock in`
                        : item.timeclock.stage == "CLOCKED_IN"
                        ? `Clock out`
                        : ""}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Timeclock;
