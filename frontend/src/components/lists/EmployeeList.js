import React from "react";
import { useSelector } from "react-redux";

const EmployeeList = () => {

    let employees = useSelector((state) => state.employees.employees)
    let current = useSelector((state) => state.employees.current);

    return (
        <table>
            <tr>
                <th><input type="checkbox"></input></th>
                <th>First name</th>
                <th>Last name</th>
                <th>Positions</th>
                <th>Departments</th>
                <th>Wage</th>
            </tr>
            {employees.map(item => (
                <tr>
                    <td><input type="checkbox"></input></td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.position.map(pos => pos.department.site == current.site && pos.name).join(", ")}</td>
                    <td>{item.position.map(pos => pos.department.site == current.site && pos.department.name).join(", ")}</td>
                    <td>{item.wage} ({item.wage_type})</td>
                </tr>
            ))}
            
        </table>
    )
}

export default EmployeeList;