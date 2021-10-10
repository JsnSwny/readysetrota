import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import employees from "../../../reducers/employees";
import {
  format,
  parseISO,
  addDays,
  isToday,
  differenceInMinutes,
  differenceInHours,
} from "date-fns";

import TimeDifference from "../../common/TimeDifference";

const DashboardShifts = () => {
  const [direction, setDirection] = useState("");

  let shifts = useSelector((state) => state.shifts.shifts);

  let loading = useSelector((state) => state.shifts.isLoading);
  let width = useSelector((state) => state.responsive.width);
  let employees = useSelector((state) => state.employees.employees);
  let departments = useSelector((state) => state.employees.departments);
  let current = useSelector((state) => state.employees.current);

  const [carouselItems, setCarouselItems] = useState([]);
  const [carouselShift, setCarouselShift] = useState(0);
  const [firstIdx, setFirstIdx] = useState("");

  const [atEnd, setAtEnd] = useState(0);

  const handleAnimationEnd = () => {
    setDirection("");
  };

  useEffect(() => {
    setCarouselItems([]);
  }, [current.site]);

  useEffect(() => {
    if (!firstIdx && shifts.length > 0 && atEnd > 0) {
      let sortedShifts = [...shifts];

      sortedShifts = sortedShifts.sort((a, b) => {
        let aDate = parseISO(a.date);
        let aHours = parseInt(a.start_time.substr(0, 2));
        let aMinutes = parseInt(a.start_time.substr(3, 5));
        aDate.setHours(aHours);
        aDate.setMinutes(aMinutes);

        let bDate = parseISO(b.date);
        let bHours = parseInt(b.start_time.substr(0, 2));
        let bMinutes = parseInt(b.start_time.substr(3, 5));
        bDate.setHours(bHours);
        bDate.setMinutes(bMinutes);

        if (
          Math.abs(differenceInMinutes(aDate, new Date())) >=
          Math.abs(differenceInMinutes(bDate, new Date()))
        ) {
          return 1;
        } else {
          return -1;
        }
      });

      let idx = shifts.findIndex((item) => item.id == sortedShifts[0].id);
      let dif = atEnd - (shifts.length - idx);
      if (shifts.length >= atEnd) {
        if (idx >= 0) {
          if (dif > 0) {
            idx = idx - dif;
          }
          setFirstIdx(idx);
          document.documentElement.style.setProperty("--shift", `${0 - idx}`);
          setCarouselShift(0 - idx);
        }
      }
    }
  }, [shifts, atEnd]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--vw",
      `${document.body.clientWidth}px`
    );
    if (width > 1600) {
      setAtEnd(5);
    } else if (width > 1000) {
      setAtEnd(4);
    } else if (width > 600) {
      setAtEnd(3);
    } else {
      setAtEnd(2);
    }
  }, [width]);

  useEffect(() => {
    document.documentElement.style.setProperty("--num", `${shifts.length}`);
    setCarouselItems(shifts);
  }, [shifts]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--vw",
      `${document.body.clientWidth}px`
    );
  });

  return (
    <div className="carousel">
      <div className="carousel__wrapper">
        <div
          onAnimationEnd={handleAnimationEnd}
          className={`carousel__list ${direction}`}
        >
          {carouselItems.map((item, idx) => {
            let isFirstTime =
              idx == 0 || carouselItems[idx - 1].start_time != item.start_time;

            return (
              <div className="carousel__card">
                <div className={`carousel__time ${!isFirstTime ? "hide" : ""}`}>
                  {item.start_time}
                </div>
                <div
                  className={`carousel__timeline ${
                    isFirstTime ? "circle" : ""
                  } ${
                    item.date != format(new Date(), "yyyy-MM-dd")
                      ? "outside"
                      : ""
                  }`}
                ></div>
                <div
                  className={`carousel__shift ${
                    item.date != format(new Date(), "yyyy-MM-dd")
                      ? "outside"
                      : ""
                  }`}
                >
                  <small>
                    {departments.length > 0 &&
                      departments.find((dep) => dep.id == item.department)
                        ?.name}
                  </small>

                  <p>
                    {item.employee.first_name}{" "}
                    <strong>{item.employee.last_name}</strong>
                  </p>
                  <p>
                    {item.start_time} - {item.end_time}
                  </p>
                  <small>
                    <TimeDifference date={item.date} time={item.start_time} />
                  </small>
                </div>
                <div className="carousel__day">
                  {parseISO(item.date) < addDays(new Date(), -1)
                    ? "Yesterday"
                    : parseISO(item.date) > addDays(new Date(), 0)
                    ? "Tomorrow"
                    : "Today"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="carousel__buttons">
        <i
          onClick={() => {
            if (carouselShift != 0) {
              document.documentElement.style.setProperty(
                "--shift",
                `${carouselShift + 1}`
              );
              setDirection("prev");
              setCarouselShift(carouselShift + 1);
            }
          }}
          className={`fas fa-chevron-circle-left ${
            carouselShift == 0 ? "disabled" : ""
          }`}
        ></i>
        <i
          onClick={() => {
            if (
              shifts.length > atEnd &&
              !(Math.abs(carouselShift) == shifts.length - atEnd)
            ) {
              document.documentElement.style.setProperty(
                "--shift",
                `${carouselShift - 1}`
              );
              setDirection("next");
              setCarouselShift(carouselShift - 1);
            }
          }}
          class={`fas fa-chevron-circle-right ${
            shifts.length <= atEnd ||
            Math.abs(carouselShift) == shifts.length - atEnd
              ? "disabled"
              : ""
          }`}
        ></i>
      </div>
    </div>
  );
};

export default DashboardShifts;
