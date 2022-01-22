import React from "react";
import { useSelector } from "react-redux";
import Switch from "react-switch";

const Permissions = ({ permissions, setPermissions }) => {
  const permission_types = useSelector(
    (state) => state.permissions.permission_types
  );

  console.log(permissions);

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
          {permission_types.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <Switch
                  onChange={() => {
                    if (permissions.includes(item.id)) {
                      setPermissions(
                        [...permissions].filter((perm) => perm != item.id)
                      );
                    } else {
                      setPermissions([...permissions, item.id]);
                    }
                  }}
                  checked={permissions.includes(item.id)}
                  onColor={"#FD809E"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
