import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getEmployees,
  getPositions,
  deleteEmployee,
} from "../../actions/employees";
import { checkUUID } from "../../actions/employees";

const Home = () => {
  const [uuid, setUUID] = useState("");
  let user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div className="enterid">
      <div className="enterid__box">
        <h1>You are not currently associated with a business.</h1>
        <form>
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
        </form>
      </div>
    </div>
  );
};

export default Home;
