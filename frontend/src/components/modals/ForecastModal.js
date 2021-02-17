import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addForecast, updateForecast } from "../../actions/employees";
import { format } from "date-fns";
import { toast } from "react-toastify";

const ForecastModal = ({ onClose, date, update }) => {
  const dispatch = useDispatch();
  const [forecastAmount, setForecastAmount] = useState(0.0);
  let current = useSelector((state) => state.employees.current);

  useEffect(() => {
    if (update) setForecastAmount(update.amount);
  }, [update]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (update) {
      dispatch(
        updateForecast(update.id, {
          date,
          amount: forecastAmount,
        })
      );
      toast.success("Forecast updaed");
    } else {
      dispatch(
        addForecast({
          amount: forecastAmount,
          date,
          site_id: current.site,
        })
      );
      toast.success("Forecast added");
    }
    setForecastAmount(0.0);
    onClose();
  };

  return (
    <div className="form">
      <div className="form__image">
        <i class="fas fa-coins"></i>
      </div>
      <p className="form__subheading">Rota Management - Forecast</p>
      <h1 className="form__heading">{date} - Forecast</h1>
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
          />
        </div>
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
