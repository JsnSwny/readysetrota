import React, { Fragment } from "react";
import { numberWithCommas } from "../../../Utilities";

const Wage = ({ wage, setWage, wageType, setWageType, currentEmployee }) => {
  console.log(currentEmployee);
  return (
    <Fragment>
      <div className="flex-container--between">
        <div className="form__control wage-input">
          <label className="form-block__label">Wage</label>
          <div className="flex-container--align-center">
            <p>£</p>
            <input
              className="form__input"
              type="number"
              name="wage"
              onChange={(e) => setWage(e.target.value)}
              autoFocus
              value={wage}
              min="0"
              step=".01"
            ></input>
            <div>
              per{" "}
              <span
                className={`${wageType == "H" ? "active" : ""}`}
                onClick={() => setWageType("H")}
              >
                hour
              </span>{" "}
              <span
                className={`${wageType == "S" ? "active" : ""}`}
                onClick={() => setWageType("S")}
              >
                annum
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {currentEmployee && (
          <Fragment>
            <h4>Wage History</h4>
            <table className="listing">
              <thead>
                <tr>
                  <th>
                    Amount <i class="fas fa-sort"></i>
                  </th>
                  <th>Start date</th>
                  <th>End date</th>
                  <th className="right"></th>
                </tr>
              </thead>
              <tbody>
                {currentEmployee.wage.map((item) => (
                  <tr className="listing__row">
                    <td className="bold">{numberWithCommas(item.wage)}</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td className="right">
                      <div className="action-sm"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

export default Wage;
