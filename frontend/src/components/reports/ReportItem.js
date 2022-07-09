import React from "react";

const ReportItem = ({ name, value, icon }) => {
  return (
    <li className="report-boxes__item">
      <div className="flex items-center">
        <i
          className={`fas ${icon} mr-6 text-3xl text-pink bg-pink bg-opacity-5 w-16 h-16 rounded-lg flex items-center justify-center`}
        ></i>
        <div>
          <div>
            <h4 className="font-normal text-gray">{name}</h4>
          </div>
          <span className="text-pink block font-bold text-4xl leading-none mt-2">
            {value}
          </span>
        </div>
      </div>
    </li>
  );
};

export default ReportItem;
