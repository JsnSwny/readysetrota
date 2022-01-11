import React from "react";

const ListAction = ({ actions }) => {
  return (
    <td className="right">
      <div className="action">
        <i class="fas fa-ellipsis-h"></i>
        <div className="action-dropdown">{actions}</div>
      </div>
    </td>
  );
};

export default ListAction;
