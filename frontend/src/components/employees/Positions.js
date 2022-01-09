import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, getPositions } from "../../actions/employees";
import TabItem from "../common/TabItem";
import PersonalDetails from "./PersonalDetails";
import { parseISO, format } from "date-fns";
import Title from "../common/Title";

const Positions = () => {
  const dispatch = useDispatch();
  let current = useSelector((state) => state.employees.current);
  let positions = useSelector((state) => state.employees.positions);
  let loading = useSelector((state) => state.loading);
  let sites = useSelector((state) => state.employees.sites);
  const employees = useSelector((state) => state.employees.employees);

  return (
    <Fragment>
      <div className="list-banner">
        <div className="flex-container--align-center">
          <i class="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search positions..."
            // value={employeeSearch}
            // onChange={(e) => {
            //   setEmployeeSearch(e.target.value);
            //   setFilteredEmployees(
            //     employees.filter((item) =>
            //       item.full_name
            //         .toLowerCase()
            //         .includes(e.target.value.toLowerCase())
            //     )
            //   );
            // }}
          />
        </div>
        <div className="list-banner__right">
          {/* <div>Departments</div>
          <div>Positions</div> */}
          <button className="btn-3">+ Add Position</button>
        </div>
      </div>
      <div className="employees">
        <table className="listing">
          <thead>
            <tr>
              <th>
                Name <i class="fas fa-sort"></i>
              </th>
              <th>Department</th>
              <th>No. of Employees</th>
              <th className="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((item) => (
              <tr className="listing__row">
                <td className="bold">{item.name}</td>
                <td>{item.department.name}</td>
                <td>
                  {
                    employees.filter((employee) =>
                      employee.position.some((pos) => pos.id == item.id)
                    ).length
                  }
                </td>
                <td className="center">
                  <i class="fas fa-ellipsis-v"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Positions;
