import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { batchApprove, getHolidays } from "../../actions/employees";
import DropButton from "./DropButton";
import { format, parseISO } from "date-fns";

const HolidayList = ({listProps}) => {

    const {action, selected, setSelected, selectAll, setSelectAll, filter} = listProps;

    let holidays = useSelector((state) => state.employees.holidays)
    let current = useSelector((state) => state.employees.current);

    const approveAction = {name: 'Approve', action: () => action('Holiday Approved', batchApprove(selected, true))};
    const unapproveAction = {name: 'Unapprove', action: () => action('Holiday Unapproved', batchApprove(selected, false))}

    const approvedFilter = {name: 'Approved', action: () => filter('Filtering by approved', getHolidays(current.site, false, true))}
    const unapprovedFilter = {name: 'Unapproved', action: () => filter('Filtering by unapproved', getHolidays(current.site, false, false))}
    const unmarkedFilter = {name: 'Unmarked', action: () => filter('Filtering by unmarked', getHolidays(current.site, false, null))}


    return (
        <Fragment>
            <DropButton title="Actions" actions={[approveAction, unapproveAction]} />
            <DropButton title="Filters" actions={[approvedFilter, unapprovedFilter, unmarkedFilter]} />
            <table>
                <tr>
                <th><input checked={selectAll} onClick={() => !selectAll ? (setSelected(holidays), setSelectAll(!selectAll)) : (setSelected([]), setSelectAll(!selectAll))} type="checkbox"></input></th>
                    <th>Employee</th>
                    <th>Date</th>
                    <th>Approved</th>
                    <th>Requested</th>
                </tr>
                {holidays.map(item => (
                        <tr className={`${selected.some(sel => sel.id == item.id) ? "selected": ""}`}>
                        <td><input checked={selected.some(sel => sel.id == item.id)} onClick={() => selected.some(sel => sel.id == item.id) ? 
                            setSelected(selected.filter(sel => sel.id != item.id)) : 
                            setSelected([...selected, item])} type="checkbox"></input></td>
                        <td>{item.employee.full_name}</td>
                        <td>{format(parseISO(item.date), "cccc do MMMM yyyy")}</td>
                        <td>{item.approved == null ? "Unmarked" : item.approved ? "Approved" : "Not Approved"}</td>
                        <td>{format(parseISO(item.updated_at), "cccc do MMMM yyyy")}</td>
                    </tr>
                ))}
                
            </table>
        </Fragment>
    )
}

export default HolidayList;