import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const GettingStartedItem = ({
  cardStyle,
  startedObj,
  pos,
  setCurrentStarted,
}) => {
  const playVideo = (ref) => {
    ref.current.play();
  };

  const pauseVideo = (ref) => {
    ref.current.pause();
  };

  const video = useRef();

  const uncompleteList = useSelector(
    (state) => state.employees.current.business.getting_started
  );

  return (
    <div
      className={`getStarted__block ${
        !uncompleteList?.includes(startedObj.uncompleteTag) ? "uncomplete" : ""
      }`}
      onMouseOver={() => {
        uncompleteList?.includes(startedObj.uncompleteTag) && playVideo(video);
      }}
      onMouseOut={() =>
        uncompleteList?.includes(startedObj.uncompleteTag) && pauseVideo(video)
      }
      style={cardStyle}
    >
      <video
        onClick={() => {
          setCurrentStarted(startedObj);
        }}
        src={startedObj.videoURL}
        ref={video}
        muted
        loop
      />
      <h2 className="getStarted__title">
        {pos + 1}. {startedObj.title}
      </h2>
      <p>{startedObj.description}</p>
      {uncompleteList?.includes(startedObj.uncompleteTag) ? (
        <Link to={startedObj.link} className="btn-3">
          {startedObj.buttonText}
        </Link>
      ) : (
        <button className="btn-3 complete">
          Complete <i className="fas fa-check"></i>
        </button>
      )}
    </div>
  );
};

export default GettingStartedItem;
