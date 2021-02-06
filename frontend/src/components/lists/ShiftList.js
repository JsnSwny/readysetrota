import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShifts } from "../../actions/shifts";
import { format, parseISO } from "date-fns";
import { batchPublish, batchDeleteShifts } from "../../actions/shifts";
import DropButton from "./DropButton";
import { toast } from "react-toastify";

const ShiftList = ({listProps}) => {
    const dispatch = useDispatch();

    const {action, selected, setSelected, selectAll, setSelectAll} = listProps;
    let shifts = useSelector((state) => state.shifts.shifts);
    let employees = useSelector((state) => state.employees.employees);

    let width = useSelector((state) => state.responsive.width);

    useEffect(() => {
        dispatch(getShifts(format(new Date(), "yyyy-MM-dd"), "", true));
    }, [])

    const toMinutes = (val) => {
        let n = new Date(0,0);
        n.setMinutes(+val * 60);
        return n.getMinutes() > 0 ? `${n.getMinutes()}mins` : "";
    }

    const publishAction = {name: 'Publish', action: () => action('Shifts Published', batchPublish(selected, true))};
    const unpublishAction = {name: 'Unpublish', action: () => action('Shifts Unpublished', batchPublish(selected, false))}
    const deleteAction = {name: 'Delete', action: () => action('Shifts Deleted', batchDeleteShifts(selected))}

    return (
        <Fragment>
            <DropButton title="Actions" actions={[publishAction, unpublishAction, deleteAction]} />
            <table>
                <tr>
                    <th><input checked={selectAll} onClick={() => !selectAll ? (setSelected(shifts), setSelectAll(!selectAll)) : (setSelected([]), setSelectAll(!selectAll))} type="checkbox"></input></th>
                    <th>Date</th>
                    <th>Start time</th>
                    <th>End time</th>
                    <th className="no-mobile">Length</th>
                    <th className="no-mobile">Cost</th>
                    <th>Employee</th>
                    <th>Published</th>
                </tr>
                {shifts.map(item => (
                    <tr className={`${selected.some(sel => sel.id == item.id) ? "selected": ""}`}>
                        <td><input checked={selected.some(sel => sel.id == item.id)} onClick={() => selected.some(sel => sel.id == item.id) ? 
                            setSelected(selected.filter(sel => sel.id != item.id)) : 
                            setSelected([...selected, item])} type="checkbox"></input></td>
                        <td>{format(parseISO(item.date), `${width < 1000 ? "ccc do MMM yyyy" : "cccc do MMMM yyyy"}`)}</td>
                        <td>{item.start_time}</td>
                        <td>{item.end_time}</td>
                        <td className="no-mobile">{parseInt(item.length) > 0 ? `${parseInt(item.length)}hrs` : ""} {toMinutes(item.length)}</td>
                        <td className="no-mobile">£{item.length * item.wage}</td>
                        <td>{item.employee ? item.employee.full_name : "Open Shift"}</td>
                        <td>{item.published ? "Published" : "Not Published"}</td>
                    </tr>
                ))} 
            </table>
        </Fragment>
    )
}

export default ShiftList;