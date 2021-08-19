import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addForecast, updateForecast } from "../../actions/employees";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import { getErrors } from "../../actions/errors";

const ForecastModal = ({ onClose, update, extra }) => {
  const dispatch = useDispatch();
  const [forecastAmount, setForecastAmount] = useState(0);
  const [actualAmount, setActualAmount] = useState(0);
  let current = useSelector((state) => state.employees.current);
  let errors = useSelector((state) => state.errors.msg);

  console.log(extra);

  useEffect(() => {
    if (update) {
      setForecastAmount(update.predicted);
      setActualAmount(update.actual);
    }
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
            date: format(extra.date, "yyyy-MM-dd"),
            predicted: forecastAmount,
            actual: actualAmount,
          })
        );
        toast.success("Forecast updated");
      } else {
        dispatch(
          addForecast({
            predicted: forecastAmount,
            actual: actualAmount,
            date: format(extra.date, "yyyy-MM-dd"),
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
      <p className="form__subheading">
        {format(extra.date, "cccc do MMMM yyyy")}
      </p>
      <h1 className="form__heading">Revenue</h1>
      <form onSubmit={onSubmit} className="form__form">
        <div className="flex-container--between">
          <div className="form__control--half">
            <label className="form__label">Predicted Forecast</label>
            <input
              className="form__input"
              type="number"
              name="forecastamount"
              onChange={(e) => setForecastAmount(e.target.value)}
              value={forecastAmount}
              step="0.01"
              autoFocus={extra.type == "predicted"}
            />
          </div>
          <div className="form__control--half">
            <label className="form__label">Actual Sales</label>
            <input
              className="form__input"
              type="number"
              name="actualamount"
              onChange={(e) => setActualAmount(e.target.value)}
              value={actualAmount}
              step="0.01"
              autoFocus={extra.type == "actual"}
            />
          </div>
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
