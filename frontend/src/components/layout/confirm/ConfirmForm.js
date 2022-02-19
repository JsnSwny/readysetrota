import React from "react";

const ConfirmForm = ({ setOpen, title, action, actionTitle }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    action();
    // toast.success("Department added!");
    setOpen(false);
  };

  return (
    <form onSubmit={onSubmit} className="form__form">
      <p>{title}</p>
      {/* <input autoFocus className="hidden" /> */}
      <hr />
      <div className="button-container">
        <button className="btn-3" type="submit" value="Delete">
          {actionTitle ? actionTitle : "Delete"}
        </button>
      </div>
    </form>
  );
};

export default ConfirmForm;
