import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import StaffProfile from "./StaffProfile";
import BusinessProfile from "./BusinessProfile";
import CreateShift from "../modals/CreateShift";

const Home = () => {
  let user = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [type, setType] = useState("");
  return (
    <Fragment>
      <CreateShift
        open={open}
        type={type}
        onConfirm={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
        update={update}
      />
      {user.business ? (
        <BusinessProfile
          setOpen={setOpen}
          setUpdate={setUpdate}
          setType={setType}
        />
      ) : (
        <StaffProfile
          setOpen={setOpen}
          setUpdate={setUpdate}
          setType={setType}
        />
      )}
    </Fragment>
  );
};

export default Home;
