import React from "react";
import { Link } from "react-router-dom";

const EmptyView = ({ title, subtitle, button }) => {
  return (
    <div className="wrapper--md flex justify-center items-center flex-col flex-1 my-8">
      <img className="w-10/12 sm:w-96" src="static/media/hero-image.svg" />

      <h2 className="mt-12 text-center">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-center w-10/12 sm:w-1/2">{subtitle}</p>
      )}
      {button &&
        (button.link ? (
          <Link to={button.link} className="btn-3 mt-8">
            {button.title}
          </Link>
        ) : (
          <button className="btn-3 mt-8" onClick={button.clickAction}>
            {button.title}
          </button>
        ))}
    </div>
  );
};

export default EmptyView;
