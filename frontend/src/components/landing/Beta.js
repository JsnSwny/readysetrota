import React, { useState } from "react";

const Beta = ({ setOpen, setType, test }) => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="beta">
      {showVideo && (
        <div className="video-modal">
          <i
            className="fas fa-times video-modal__close"
            onClick={() => setShowVideo(false)}
          ></i>
          <iframe
            src="https://www.youtube.com/embed/vLT36DLVaSo"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <img src="/static/media/readysetcore-01.svg"></img>

      <h1>readysetrota BETA</h1>
      <p>
        Welcome to the <strong>Free Beta</strong> for{" "}
        <strong>readysetrota</strong>, an easy-to-use application which aims to
        improve the way you manage rotas.
        <br />
        <br /> Watch the demo below to learn how you can get started in less
        than 3 minutes.
      </p>
      <div className="flex-container--betwen">
        <button onClick={() => setShowVideo(true)}>Watch the Demo</button>
        <button
          onClick={() => {
            setOpen(true);
            setType("register");
          }}
        >
          Join the Free Beta
        </button>
      </div>
    </div>
  );
};

export default Beta;
