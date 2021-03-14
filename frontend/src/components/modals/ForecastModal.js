import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addForecast, updateForecast } from "../../actions/employees";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { getErrors } from "../../actions/errors";

const ForecastModal = ({ onClose, date, update }) => {
  const dispatch = useDispatch();
  const [forecastAmount, setForecastAmount] = useState("");
  let current = useSelector((state) => state.employees.current);
  let errors = useSelector((state) => state.errors.msg);

  useEffect(() => {
    if (update) setForecastAmount(update.amount);
  }, [update]);

  const onSubmit = (e) => {
    e.preventDefault();
    let error_obj = {
      forecast: forecastAmount != "" ? true : "This field is required",
    };
    dispatch(getErrors(error_obj, 400));

    if (
      Object.keys(error_obj).every((k) => {
        return error_obj[k] == true;
      })
    ) {
      if (update) {
        dispatch(
          updateForecast(update.id, {
            date,
            amount: forecastAmount,
          })
        );
        toast.success("Forecast updated");
      } else {
        dispatch(
          addForecast({
            amount: forecastAmount,
            date,
            site_id: current.site.id,
          })
        );
        toast.success("Forecast added");
      }
      setForecastAmount(0.0);
      onClose();
    }
  };

  return (
    <div className="form">
      <div className="form__image">
        <i class="fas fa-coins"></i>
      </div>
      {console.log(date)}
      <p className="form__subheading">
        {format(parseISO(date), "cccc do MMMM yyyy")}
      </p>
      <h1 className="form__heading">Forecast</h1>
      <form onSubmit={onSubmit} className="form__form">
        <div className="form__control">
          <label className="form__label">Forecast Amount*</label>
          <input
            className="form__input"
            type="number"
            name="forecastamount"
            onChange={(e) => setForecastAmount(e.target.value)}
            value={forecastAmount}
            step="0.01"
            autoFocus
          />
        </div>
        <p className="error">{errors.forecast}</p>
        <div className="flex-container--between form__actions">
          <button className="form__save" type="submit" value="Save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForecastModal;
