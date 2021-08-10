import React, { Fragment } from "react";
import { differenceInMinutes, differenceInHours, parseISO } from "date-fns";

const TimeDifference = ({ date, time }) => {
  let parsedDate = parseISO(date);
  parsedDate.setHours(time.substr(0, 2));
  parsedDate.setMinutes(time.substr(3, 5));
  return (
    <Fragment>
      {Math.sign(differenceInMinutes(parsedDate, new Date())) == 1 && "in "}
      {differenceInHours(parsedDate, new Date()) != 0 &&
        `${Math.abs(differenceInHours(parsedDate, new Date()))} hours `}
      {differenceInMinutes(parsedDate, new Date()) != 0 &&
        `${
          Math.abs(differenceInMinutes(parsedDate, new Date())) -
          Math.abs(differenceInHours(parsedDate, new Date())) * 60
        } minutes`}

      {Math.sign(differenceInMinutes(parsedDate, new Date())) == -1 && " ago"}
    </Fragment>
  );
};

export default TimeDifference;
