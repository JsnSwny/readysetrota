import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../../../actions/employees";
import { format } from "date-fns";
import Select from "react-select";

const QuickEmployeeForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [positionList, setPositionList] = useState([]);
  const current = useSelector((state) => state.employees.current);
  let errors = useSelector((state) => state.errors.msg);

  const departments = useSelector((state) => state.employees.departments);
  const positions = useSelector((state) => state.employees.positions);

  const options = departments.map((item) => ({
    label: item.name,
    options: positions
      .filter((pos) => pos.department.id == item.id)
      .map((pos) => ({ label: pos.name, value: pos.id })),
  }));

  const onSubmit = (e) => {
    e.preventDefault();
    const employeeObj = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      position_id: [],
      permissions_id: [],
      site_id: [current.site.id],
      business_id: current.business.id,
      start_working_date: format(new Date(), "yyyy-MM-dd"),
    };
    dispatch(addEmployee(employeeObj));
    setOpen(false);
  };

  return (
    <form onSubmit={onSubmit} className="form__form">
      <div className="flex-container--between">
        <div className="form__control--half">
          <label className="form__label">First Name*</label>
          <input
            className="form__input"
            type="text"
            name="first_name "
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
            value={firstName}
            autoComplete="off"
          ></input>
          <p className="error">{errors.name}</p>
        </div>
        <div className="form__control--half">
          <label className="form__label">Last Name*</label>
          <input
            className="form__input"
            type="text"
            name="first_name "
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            autoComplete="off"
          ></input>
          <p className="error">{errors.name}</p>
        </div>
      </div>

      <div className="form__control">
        <label className="form__label">Email</label>
        <input
          className="form__input"
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
        <p className="error">{errors.name}</p>
      </div>
      <div className="form__control">
        <label className="form__label">Role</label>
        <Select
          isMulti
          options={options}
          className="react-select-container"
          classNamePrefix="react-select"
          value={positionList}
          onChange={(e) => {
            setPositionList(e);
          }}
          placeholder={"Select position(s)"}
        />
        <p className="error">{errors.name}</p>
      </div>

      <hr />
      <div className="button-container">
        <button className="btn-3" type="submit" value="Add Employee">
          Add Employee
        </button>
      </div>
    </form>
  );
};

export default QuickEmployeeForm;
