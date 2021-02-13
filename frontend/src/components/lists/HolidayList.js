import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { batchApprove, getHolidays } from "../../actions/employees";
import DropButton from "./DropButton";
import { format, parseISO } from "date-fns";
import TableHeaders from "./TableHeaders";

const HolidayList = ({listProps}) => {

    const {action, selected, setSelected, selectAll, setSelectAll, filter} = listProps;

    let current = useSelector((state) => state.employees.current);
    let holidays = useSelector((state) => state.employees.holidays)
    const [filterHolidays, setFilterHolidays] = useState(holidays);
    

    const dispatch = useDispatch();

    useEffect(() => {
        setFilterHolidays(holidays);
    }, [holidays])

    useEffect(() => {
        dispatch(getHolidays(current.site));
    }, [])

    const approveAction = {name: 'Approve', action: () => action('Holiday Approved', batchApprove(selected, true))};
    const unapproveAction = {name: 'Unapprove', action: () => action('Holiday Unapproved', batchApprove(selected, false))}

    const allFilter = {name: 'All', action: () => filter('Showing all holidays', setFilterHolidays(holidays))}
    const approvedFilter = {name: 'Approved', action: () => filter('Filtering by approved', setFilterHolidays(holidays.filter(item => item.approved)))}
    const unapprovedFilter = {name: 'Unapproved', action: () => filter('Filtering by unapproved', setFilterHolidays(holidays.filter(item => item.approved == false)))}
    const unmarkedFilter = {name: 'Unmarked', action: () => filter('Filtering by unmarked', setFilterHolidays(holidays.filter(item => item.approved == null)))}

    return (
        <Fragment>
            <DropButton title="Actions" actions={[approveAction, unapproveAction]} />
            <DropButton title="Filters" actions={[allFilter, approvedFilter, unapprovedFilter, unmarkedFilter]} />
            <table>
            <TableHeaders check={true} items={filterHolidays} titles={ [{name: 'Employee'}, {name: "Type"}, {name: 'Date'}, {name: 'Approved'}, {name: 'Requested' }]} selectAll={selectAll} setSelectAll={setSelectAll} setSelected={setSelected} />
                {filterHolidays.map(item => item && (
                        <tr onClick={() => selected.some(sel => sel.id == item.id) ? 
                            setSelected(selected.filter(sel => sel.id != item.id)) : 
                            setSelected([...selected, item])} className={`${selected.some(sel => sel.id == item.id) ? "selected": ""}`}>
                        <td><input checked={selected.some(sel => sel.id == item.id)} type="checkbox"></input></td>
                        <td>{item.employee.full_name}</td>
                        <td>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</td>
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