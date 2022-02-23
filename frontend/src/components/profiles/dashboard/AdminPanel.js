import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSites } from "../../../actions/employees";
import Title from "../../common/Title";
import {
  format,
  differenceInMinutes,
  differenceInHours,
  addDays,
  addMonths,
  eachDayOfInterval,
  addBusinessDays,
} from "date-fns";
import { getTodayShifts } from "../../../actions/shifts";
import { Bar, Line } from "react-chartjs-2";
import { getStats } from "../../../actions/stats";
import DashboardShifts from "./DashboardShifts";
import StatsItem from "./StatsItem";
import { Link } from "react-router-dom";
import GettingStartedItem from "./GettingStartedItem";
import Carousel from "./Carousel";
import gettingStartedList from "./gettingStartedList.json";
import { useOnClickOutside } from "../../../utils/hooks/useOnClickOutside";
import TaskCard from "./TaskCard";
import auth from "../../../reducers/auth";

const AdminPanel = ({ setDashboardView }) => {
  const dispatch = useDispatch();

  const [direction, setDirection] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(addDays(new Date(), 7));

  let current = useSelector((state) => state.employees.current);
  let stats = useSelector((state) => state.stats.stats);
  let shifts = useSelector((state) => state.shifts.shifts);
  let isLoading = useSelector((state) => state.shifts.isLoading);
  let user = useSelector((state) => state.auth.user);
  const width = useSelector((state) => state.responsive.width);
  const uncompleteList = useSelector(
    (state) => state.employees.current.business.getting_started
  );

  const auth = useSelector((state) => state.auth);

  const tasks = useSelector((state) => state.employees.current.site.tasks);

  const [interval, setInterval] = useState([]);

  const [currentStarted, setCurrentStarted] = useState(false);

  const carouselContainer = useRef();

  const ref = useRef();
  useOnClickOutside(ref, () => setCurrentStarted(false));

  useEffect(() => {
    setInterval(
      eachDayOfInterval({
        start: startDate,
        end: endDate,
      })
    );
    dispatch(
      getStats(
        "business",
        current.site.id,
        format(startDate, "dd/MM/yyyy"),
        format(endDate, "dd/MM/yyyy"),
        "site"
      )
    );
  }, [startDate, endDate, current.site]);

  useEffect(() => {
    if (!auth.isLoading) dispatch(getSites());
  }, [auth]);

  useEffect(() => {
    dispatch(
      getTodayShifts(
        format(addDays(new Date(), -1), "yyyy-MM-dd"),
        format(addDays(new Date(), 1), "yyyy-MM-dd")
      )
    );
  }, [current.department]);

  const getStartingPos = () => {
    return gettingStartedList.items.findIndex((item) =>
      uncompleteList.includes(item.uncompleteTag)
    );
  };

  const itemsInCarousel = () => {
    if (width > 1600) {
      return 4;
    } else if (width > 1000) {
      return 3;
    } else if (width > 600) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <Fragment>
      {currentStarted && (
        <div className="modal-container">
          <div className="video-modal" ref={ref}>
            <div className="heading">
              <div>
                <h3>{currentStarted.title}</h3>
                <p>{currentStarted.description}</p>
              </div>

              <i
                class="fas fa-times"
                onClick={() => {
                  setCurrentStarted(false);
                }}
              ></i>
            </div>
            <video src={currentStarted.videoURL} muted loop autoPlay></video>
          </div>
        </div>
      )}
      <div className="dashboard wrapper--md">
        <h1 className="big-title">
          Hey {user.first_name}, Welcome to readysetrota
        </h1>
        <div className="flex-container--align-center">
          <h2 className="title-sm">Getting started</h2>
        </div>

        <hr class="separator" />

        {uncompleteList && (
          <div ref={carouselContainer}>
            <Carousel
              startingPos={getStartingPos() == -1 ? 0 : getStartingPos()}
              itemsInCarousel={itemsInCarousel()}
              carouselContainer={carouselContainer}
            >
              {gettingStartedList.items.map((item, idx) => (
                <GettingStartedItem
                  startedObj={item}
                  pos={idx}
                  setCurrentStarted={setCurrentStarted}
                />
              ))}
            </Carousel>
          </div>
        )}

        <div className="dashboard__header">
          <h2 className="title-sm title--margin-top">Tasks</h2>
        </div>

        <hr class="separator" />

        <div className="tasks flex-container--between">
          <TaskCard
            icon="fa-briefcase"
            title="Publish Shifts"
            text={
              <p>
                You have <span>{tasks.shifts}</span> shift to approve
              </p>
            }
            button="Go to rota"
            colour={tasks.shifts > 0 ? "red" : "green"}
            link="rota"
          />
          <TaskCard
            icon="fa-umbrella-beach"
            title="Approve Holidays"
            text={
              <p>
                You have <span>{tasks.holidays}</span> holiday to approve
              </p>
            }
            button="Go to holidays"
            colour={tasks.holidays > 0 ? "red" : "green"}
            link="availability"
          />
          <TaskCard
            icon="fa-user"
            title="Invite Employees"
            text={
              <p>
                You have <span>{tasks.uninvited}</span> uninvited employees
              </p>
            }
            button="Go to employees"
            colour={tasks.uninvited > 0 ? "red" : "green"}
            link="employees"
          />
          <TaskCard
            icon="fa-money-bill"
            title="Actual Revenue"
            text={
              <p>
                You have <span>{tasks.actual_revenue}</span> actual revenues to
                input
              </p>
            }
            button="Go to forecast"
            link="forecasting"
            colour={tasks.actual_revenue > 0 ? "red" : "green"}
          />
        </div>

        <div className="flex-container--align-center">
          <h2 className="title-sm title--margin-top">Today's Shifts</h2>
        </div>

        <hr class="separator" />

        <div className="todayShifts">
          {isLoading ? (
            <div class="dot-pulse"></div>
          ) : shifts.length > 0 ? (
            <DashboardShifts />
          ) : (
            <p>No shifts to display</p>
          )}
        </div>
        <div className="dashboard__header">
          <h2 className="title-sm title--margin-top">This Week's Analytics</h2>
        </div>
        <hr class="separator" />
        {stats && interval.length > 0 && (
          <div className="stats-graph__container">
            <StatsItem
              title="Number of Shifts Worked"
              decimals={0}
              data={interval.map((item) =>
                stats.hours.find(
                  (stat) => stat.day == format(item, "yyyy-MM-dd")
                )
                  ? stats.hours.find(
                      (stat) => stat.day == format(item, "yyyy-MM-dd")
                    ).c
                  : 0
              )}
              interval={interval}
            />
            <StatsItem
              title="Estimated Outcome"
              decimals={2}
              data={Object.values(stats.total_cost).map((item) =>
                parseInt(item)
              )}
              interval={interval}
              prefix={"£"}
            />
            <StatsItem
              title="Estimated Turnover"
              decimals={2}
              data={Object.values(stats.forecast_dif).map((item) =>
                parseInt(item)
              )}
              interval={interval}
              prefix={"£"}
            />
            <StatsItem
              title="Hours Worked"
              decimals={1}
              data={Object.values(stats.total_hours).map((item) =>
                parseInt(item)
              )}
              interval={interval}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AdminPanel;
