import React from "react";

const Permissions = () => {
  return (
    <div>
      <table className="listing">
        <thead>
          <tr>
            <th>Permission</th>
            <th>Details</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.length > 0 &&
            filteredDepartments.map((item) => (
              <tr className="listing__row">
                <td className="bold">{item.name}</td>
                <td>{item.number_of_employees}</td>
                <td className="right">
                  <div className="action-sm">
                    <i
                      class="fas fa-edit"
                      onClick={() => {
                        setEditDepartment(item);
                        setOpen(true);
                      }}
                    ></i>
                    <i
                      class="fas fa-trash"
                      onClick={() => {
                        setSelectedDepartment(item);
                        setConfirmOpen(true);
                      }}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
