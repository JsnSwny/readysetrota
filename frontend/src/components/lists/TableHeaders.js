import React from "react";

const TableHeaders = ({titles, items, setSelected, setSelectAll, selectAll}) => {
    return (
        <tr>
            <th><input checked={selectAll} onClick={() => !selectAll ? (setSelected(items), setSelectAll(!selectAll)) : (setSelected([]), setSelectAll(!selectAll))} type="checkbox"></input></th>
            {titles.map(item => <th className={`${item.nomobile ? "no-mobile" : ""}`}>{item.name}</th>)}
        </tr>
    )
}

export default TableHeaders;