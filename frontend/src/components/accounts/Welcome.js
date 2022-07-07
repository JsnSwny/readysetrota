import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateBusiness } from "../../actions/employees";
import ChecklistItem from "./ChecklistItem";

const Welcome = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const checklist = useSelector((state) => state.checklist.items);
  const getChecklistPercentage = () => {
    let values = checklist.map((item) => item.active);
    return (
      (values.filter((item) => item == true).length / values.length) *
      100
    ).toFixed(0);
  };

  if (getChecklistPercentage() == 100) {
    dispatch(updateBusiness(user.business.id, { show_welcome: false }));
  }

  if (!user.business.show_welcome) {
    return <Redirect to="/" />;
  }
  return (
    <div className="welcome">
      <div className="wrapper--sm">
        <div className="welcome-block">
          <h1 className="welcome-block__title">Welcome {user.first_name}!</h1>
          <small
            className="welcome-block__link"
            onClick={() => {
              dispatch(
                updateBusiness(user.business.id, { show_welcome: false })
              );
            }}
          >
            Don't show me the welcome page anymore
          </small>
          <hr className="welcome-block__separator"></hr>
          <h2>Let's get started</h2>
          <p>
            Hello and welcome to readysetrota! By signing up you have completed
            the first step in saving time managing your rotas. If you are
            interested in learning more about the application, you can book a
            quick 15-minute demo with the CEO by clicking the button below.
          </p>
          <button className="btn-3">
            <a href="https://calendly.com/readysetrota/demo" target="_blank">
              Request a demo
            </a>
          </button>
          <hr className="welcome-block__separator"></hr>
          <h3>Your Progress</h3>
          <div className="percentage-progress">
            <div
              className="percentage-progress__complete"
              style={{ width: `${getChecklistPercentage()}%` }}
            ></div>
            <div className="percentage-progress__uncomplete"></div>
          </div>
          <p className="percentage-progress__amount">
            {getChecklistPercentage()}% complete
          </p>
          <ul className="welcome-checklist">
            {checklist.map((item, idx) => (
              <ChecklistItem
                title={item.name}
                checklistItem={item.codename}
                item_no={idx + 1}
                link={item.link}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
