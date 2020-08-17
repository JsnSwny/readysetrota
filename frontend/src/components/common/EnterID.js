import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUUID } from "../../actions/employees";
import { useParams, Redirect } from "react-router-dom";

const EnterID = (props) => {
  let { id } = useParams();

  const [uuid, setUUID] = useState("");
  let user = useSelector((state) => state.auth.user);
  let uuid_success = useSelector((state) => state.employees.uuid_success);
  const dispatch = useDispatch();

  let errors = useSelector((state) => state.errors.msg);

  useEffect(() => {
    if (id) {
      setUUID(id);
      dispatch(checkUUID(id, user.id));
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  if (!uuid_success) {
    return (
      <div className="enterid">
        <div className="enterid__box">
          <h1>Add a business to your account.</h1>
          <form onSubmit={onSubmit}>
            <label>Enter your unique ID</label>
            <input
              type="text"
              className="input-1"
              value={uuid}
              onChange={(e) => {
                setUUID(e.target.value);
              }}
            ></input>
            <button
              className="btn-2"
              onClick={() => {
                dispatch(checkUUID(uuid, user.id));
              }}
            >
              Connect
            </button>
            <p className="error">{errors.uuid}</p>
          </form>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default EnterID;
