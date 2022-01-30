import React, { Fragment, useState } from "react";
import { numberWithCommas } from "../../../Utilities";
import ListAction from "../../tables/ListAction";
import { Link } from "react-router-dom";
import SmallModal from "../../../layout/SmallModal";
import ConfirmModal from "../../../layout/confirm/ConfirmModal";
import WageForm from "./WageForm";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmployeesForm from "../EmployeesForm";
import { addDays, parseISO, format } from "date-fns";

const Wage = ({
  wage,
  setWage,
  wageType,
  setWageType,
  currentEmployee,
  wageDate,
  setWageDate,
}) => {
  const [editWage, setEditWage] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <Fragment>
      {open && (
        <SmallModal open={open} setOpen={setOpen} title={`Edit wage`}>
          <WageForm setOpen={setOpen} editWage={editWage} />
        </SmallModal>
      )}
      {confirmOpen && selectedDepartment && (
        <ConfirmModal
          title={`Are you sure you want to delete this wage?`}
          open={confirmOpen}
          setOpen={setConfirmOpen}
          setConfirmOpen={setConfirmOpen}
          action={() => {
            // dispatch(deleteWage(editWage.id));
          }}
        />
      )}
      <div className="flex-container--between">
        <div className="form__control--half wage-input">
          <label className="form-block__label">Add New Wage</label>
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
        <div className="form__control--half">
          <label className="form-block__label">Start Date*</label>
          <DatePicker
            selected={wageDate}
            onChange={(date) => setWageDate(date)}
            className="form__input"
            dateFormat="MMMM do yyyy"
            minDate={
              currentEmployee && currentEmployee.wage
                ? addDays(parseISO(currentEmployee.wage[0].start_date), 1)
                : null
            }
          />
          <small>
            The current wage end date will be set to the date before this.
          </small>
        </div>
      </div>
      <div>
        {currentEmployee && (
          <Fragment>
            <h4>Wage History</h4>
            <hr className="separator" />
            <table className="listing">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Start date</th>
                  <th>End date</th>
                  {/* <th className="right"></th> */}
                </tr>
              </thead>
              <tbody>
                {currentEmployee.wage.map((item) => (
                  <tr
                    className={`listing__row ${
                      item.id == currentEmployee.current_wage.id ? "active" : ""
                    }`}
                  >
                    <td className="bold">
                      {numberWithCommas(item.wage)}{" "}
                      {item.wage_type == "H" ? "per hour" : "per annum"}
                    </td>
                    <td>{format(parseISO(item.start_date), "do MMM yyyy")}</td>
                    <td>
                      {item.end_date
                        ? format(parseISO(item.end_date), "do MMM yyyy")
                        : "Present"}
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
