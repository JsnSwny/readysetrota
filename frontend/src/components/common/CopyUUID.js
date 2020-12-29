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
      onClick={(e) => {
        toast.info(
          <div>
            {`${employee.first_name} ${employee.last_name}`}
            <br /> UUID copied! <br /> <br /> <small>{employee.uuid}</small>
          </div>
        );
        copyToClipboard(`www.readysetrota.com/join/${employee.uuid}/`);
      }}
      className="btn-uuid fas fa-clipboard"
    ></i>
  );
};

export default CopyUUID;
