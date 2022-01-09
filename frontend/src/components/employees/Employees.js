import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, getPositions } from "../../actions/employees";
import TabItem from "../common/TabItem";
import PersonalDetails from "./PersonalDetails";
import { parseISO, format } from "date-fns";
import Title from "../common/Title";

const Employees = () => {
  const dispatch = useDispatch();
  let current = useSelector((state) => state.employees.current);
  let business = useSelector((state) => state.employees.business);
  let positions = useSelector((state) => state.employees.positions);
  let departments = useSelector((state) => state.employees.departments);
  let user = useSelector((state) => state.auth.user);
  let loading = useSelector((state) => state.loading);
  let sites = useSelector((state) => state.employees.sites);
  let [currentEmployee, setCurrentEmployee] = useState(false);
  let [currentEmployeeObj, setCurrentEmployeeObj] = useState({});
  const employees = useSelector((state) => state.employees.employees);

  const [currentSection, setCurrentSection] = useState("Personal Details");

  const [employeeSearch, setEmployeeSearch] = useState("");

  const [filteredEmployees, setFilteredEmployees] = useState({});

  useEffect(() => {
    if (employees.length > 0) {
      setFilteredEmployees(employees);
    }
  }, [employees]);

  useEffect(() => {
    if (currentEmployee) {
      setCurrentEmployeeObj(
        employees.find((item) => item.id == currentEmployee)
      );
    }
  }, [currentEmployee]);

  return (
    // <div className="three-grids">
    //   <div className="tab-wrapper">
    //     <div
    //       className={`employees__list tab ${!currentEmployee ? "active" : ""}`}
    //     >
    //       <h3>Employees</h3>
    //       <p className="tab__link">+ Add Employee</p>
    //       <div className="tab__list">
    //         <input
    //           type="text"
    //           className="search-field"
    //           placeholder="Search employees..."
    //           value={employeeSearch}
    //           onChange={(e) => {
    //             setEmployeeSearch(e.target.value);
    //             setFilteredEmployees(
    //               employees.filter((item) =>
    //                 item.full_name
    //                   .toLowerCase()
    //                   .includes(e.target.value.toLowerCase())
    //               )
    //             );
    //           }}
    //         />
    //         {filteredEmployees.length > 0 &&
    //           filteredEmployees.map((item) => (
    //             <TabItem
    //               id={item.id}
    //               title={`${item.first_name} ${item.last_name}`}
    //               current={currentEmployee}
    //               setCurrent={setCurrentEmployee}
    //             />
    //           ))}
    //       </div>
    //     </div>
    //     <div
    //       className={`employees__section tab ${
    //         currentEmployee ? "active" : ""
    //       }`}
    //     >
    //       {Object.keys(currentEmployeeObj).length != 0 && (
    //         <Fragment>
    //           <h3>{currentEmployeeObj.full_name}</h3>
    //           {/* <small>
    //             Created{" "}
    //             {format(
    //               parseISO(currentEmployeeObj.created_at),
    //               "do MMMM yyyy"
    //             )}
    //           </small> */}
    //         </Fragment>
    //       )}

    //       <small
    //         className="tab__link"
    //         onClick={() => {
    //           setCurrentEmployee(false);
    //           setCurrentEmployeeObj({});
    //         }}
    //       >
    //         Back to employees
    //       </small>
    //       <div className="tab__list">
    //         <TabItem
    //           title="Personal Details"
    //           current={currentSection}
    //           setCurrent={setCurrentSection}
    //         />
    //         <TabItem
    //           title="Wage Information"
    //           current={currentSection}
    //           setCurrent={setCurrentSection}
    //         />
    //         <TabItem
    //           title="Status"
    //           current={currentSection}
    //           setCurrent={setCurrentSection}
    //         />
    //         <TabItem
    //           title="Roles and Locations"
    //           current={currentSection}
    //           setCurrent={setCurrentSection}
    //         />
    //         <TabItem
    //           title="Permissions"
    //           current={currentSection}
    //           setCurrent={setCurrentSection}
    //         />
    //         <TabItem
    //           title="Availability and Holidays"
    //           current={currentSection}
    //           setCurrent={setCurrentSection}
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   <div className="form-block">
    //     <div className="form-block__wrapper">
    //       <Fragment>
    //         <div className="form-block__heading">
    //           <h3>{currentSection}</h3>
    //         </div>
    //         <PersonalDetails obj={currentEmployeeObj} />
    //       </Fragment>
    //     </div>
    //   </div>
    // </div>
    <Fragment>
      <div className="list-banner">
        <div className="flex-container--align-center">
          <i class="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search employees..."
            value={employeeSearch}
            onChange={(e) => {
              setEmployeeSearch(e.target.value);
              setFilteredEmployees(
                employees.filter((item) =>
                  item.full_name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            }}
          />
        </div>
        <div className="list-banner__right">
          {/* <div>Departments</div>
          <div>Positions</div> */}
          <button className="btn-3">+ Add Employee</button>
        </div>
      </div>
      <div className="employees">
        <table className="listing">
          <thead>
            <tr>
              <th>
                Name <i class="fas fa-sort"></i>
              </th>
              <th>Email</th>
              <th>
                Wage <i class="fas fa-sort"></i>
              </th>
              <th>
                Created <i class="fas fa-sort"></i>
              </th>
              <th className="center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 &&
              filteredEmployees.map((item) => (
                <tr className="listing__row">
                  <td className="bold">
                    <span className="profile-picture">
                      {item.first_name.substr(0, 1)}
                      {item.last_name.substr(0, 1)}
                    </span>
                    {item.full_name}
                  </td>
                  <td className="highlight">jason@readysetcore.com</td>
                  <td>£10 per hour</td>
                  <td>{format(parseISO(item.created_at), "do MMM yyyy")}</td>
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

export default Employees;
