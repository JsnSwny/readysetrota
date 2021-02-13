import React from "react";
import { useSelector } from "react-redux";
import TableHeaders from "./TableHeaders";
import TableContent from "./TableContent"

const SiteOverviewList = ({listProps}) => {

    let sites = useSelector((state) => state.employees.sites)
    let current = useSelector((state) => state.employees.current);
    const {action, selected, setSelected, selectAll, setSelectAll, filter} = listProps;

    return (
        <table>
            <TableHeaders check={true} items={employees} titles={[{name: "Site"}, {name: 'Unpublished Shifts'}, {name: 'Unmarked Holidays'}]} selectAll={selectAll} setSelectAll={setSelectAll} setSelected={setSelected} />
            {sites.map(item => (
                    <tr onClick={() => selected.some(sel => sel.id == item.id) ? 
                            setSelected(selected.filter(sel => sel.id != item.id)) : 
                            setSelected([...selected, item])} className={`${selected.some(sel => sel.id == item.id) ? "selected": ""}`} >
                                            <td><input checked={selected.some(sel => sel.id == item.id)} type="checkbox"></input></td>

                    <td>{item.name}</td>
                    <td>{item.unpublished_shifts}</td>
                    <td>{item.unmarked_holidays}</td>
                </tr>
            ))}
            
        </table>
    )
}

export default SiteOverviewList;