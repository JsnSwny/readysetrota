import React from "react";

const TableContent = ({items, selected, setSelected, content}) => {
    return (
        items.map(item => (
            <tr onClick={() => selected.some(sel => sel.id == item.id) ? 
                setSelected(selected.filter(sel => sel.id != item.id)) : 
                setSelected([...selected, item])} className={`${selected.some(sel => sel.id == item.id) ? "selected": ""}`}>
            <td><input checked={selected.some(sel => sel.id == item.id)} type="checkbox"></input></td>
            {content.map(con => <td>{con}</td>)}
        </tr>
    ))
    )
}

export default TableContent;