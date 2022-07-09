import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Title = ({
  name,
  subtitle,
  buttons,
  customButtons,
  clickAction,
  wrapper = "--md",
}) => (
  <Fragment>
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end pt-8">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-normal">{name}</h1>
        {subtitle && (
          <p className="text-sm mt-1 sm:text-base sm:mt-2">{subtitle}</p>
        )}
      </div>

      <div className="flex mt-5 sm:mt-0">
        {customButtons}
        {buttons &&
          buttons.map((item, idx) =>
            item.link ? (
              <Link to={item.link} className={`btn-3 ${idx > 0 && "ml-2"}`}>
                {item.name}
              </Link>
            ) : (
              <button
                className={`btn-3 ${idx > 0 && "ml-2"}`}
                onClick={item.clickAction}
              >
                {item.name}
              </button>
            )
          )}
      </div>
    </div>
    <hr className="separator" />
  </Fragment>
);

export default Title;
