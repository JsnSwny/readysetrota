import React from "react";
import { toast } from "react-toastify";

const CopyUUID = (props) => {
  const { employee } = props;
  function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }
  return (
    <i
      style={{
        marginLeft: "10px",
        cursor: "pointer",
      }}
      onClick={(e) => {
        toast.info(
          <div>
            {employee.first_name + " " + employee.last_name}
            <br /> UUID copied! <br /> <br /> <small>{employee.uuid}</small>
          </div>
        );
        copyToClipboard(`www.readysetrota.com/join/${employee.uuid}/`);
      }}
      className="fas fa-clipboard"
    ></i>
  );
};

export default CopyUUID;
