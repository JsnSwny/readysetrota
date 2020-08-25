import React, { useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [currentFeature, setCurrentFeature] = useState("availability");

  return (
    <div style={{ backgroundColor: "white" }}>
      <section className="landing__hero container-2">
        <div className="landing__hero-text">
          <h2>
            Improve the way you manage rotas with <strong>readysetrota.</strong>
          </h2>
          <p>
            Tailored with small businesses in mind, readysetrota aims to
            simplify the time consuming task of creating rotas, so you can spend
            more time on other responsibilities.
          </p>
          <Link to="/register">
            <button className="btn-5">Sign up for free</button>
          </Link>
        </div>
        <div>
          <img
            className="landing__hero-image"
            src="/static/media/calendar.svg"
          ></img>
        </div>
      </section>
      <section className="landing__section blue-section">
        <div className="container-2">
          <h2 className="landing__section-title">how it works</h2>
          <video className="landing__video" controls>
            <source
              src="/static/media/readysetrota-demo.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <section className="landing__section">
        <div className="">
          <h2 className="landing__section-title">about</h2>
          <div className="landing__about">
            <img src="/static/media/about.jpg" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare in
              duis egestas duis vulputate mi felis id massa. Elit massa nunc
              turpis odio et ipsum sit. Lorem mattis morbi elementum quis et
              ullamcorper. Velit hendrerit iaculis in donec donec viverra. Sit
              id mauris integer pellentesque. Felis, nisl sagittis feugiat sit
              facilisis sed congue in. Sed urna, dictum arcu cursus feugiat.
              Ullamcorper gravida facilisi in gravida mattis arcu. Viverra lorem
              dignissim massa egestas urna massa. Ut diam leo aliquam eget
              tortor mauris, vitae velit. Aliquam cras id faucibus id. Sed
              vestibulum, hendrerit elementum non vel. Leo egestas in ante
              integer.
            </p>
          </div>
        </div>
      </section>
      <section className="landing__section blue-section">
        <div className="container-2">
          <h2 className="landing__section-title">why choose readysetrota</h2>
          <p className="landing__section-subtitle">
            Do you wish there was an easier way to handle your rotas? Here are
            some of the reasons you should choose readysetrota
          </p>
          <div className="landing__chooseus">
            <div className="landing__chooseus-item">
              <i class="far fa-calendar"></i>
              <p>
                From working in the hospitality industry I have first-hand
                experience of receiving a rota and I have used this in helping
                me build this application.
              </p>
            </div>
            <div className="landing__chooseus-item">
              <i class="far fa-comments"></i>
              <p>
                As I have independently built this application from the ground
                up, you will receive one-to-one interaction with myself to
                assist you with any queries or suggestions you may have.
              </p>
            </div>
            <div className="landing__chooseus-item">
              <i class="fas fa-money-bill-wave"></i>
              <p>
                With the option to use readysetrota for free, you can also
                upgrade to premium features for a guaranteed cheaper price to
                any other rota applications.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="landing__section">
        <div className="container-2">
          <h2 className="landing__section-title">features</h2>
          <p className="landing__section-subtitle">
            readysetrota offers many features to save you time when making up
            your rota, here are just some of the features available.
          </p>
          <div className="landing__features-list">
            <p
              className={`${currentFeature == "availability" ? "active" : ""}`}
              onClick={() => {
                setCurrentFeature("availability");
              }}
            >
              Availability
            </p>
            <p
              className={`${currentFeature == "publishing" ? "active" : ""}`}
              onClick={() => {
                setCurrentFeature("publishing");
              }}
            >
              Publishing
            </p>
            <p
              className={`${currentFeature == "exporting" ? "active" : ""}`}
              onClick={() => {
                setCurrentFeature("exporting");
              }}
            >
              Exporting
            </p>
            <p
              className={`${currentFeature == "sortbyday" ? "active" : ""}`}
              onClick={() => {
                setCurrentFeature("sortbyday");
              }}
            >
              Sort by Day
            </p>
          </div>
          <div className="landing__features-content">
            <img src={`/static/media/${currentFeature}.png`} />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ornare in
              duis egestas duis vulputate mi felis id massa. Elit massa nunc
              turpis odio et ipsum sit. Lorem mattis morbi elementum quis et
              ullamcorper. Velit hendrerit iaculis in donec donec viverra. Sit
              id mauris integer pellentesque. Felis, nisl sagittis feugiat sit
              facilisis sed congue in. Sed urna, dictum arcu cursus feugiat.
              Ullamcorper gravida facilisi in gravida mattis arcu.
            </p>
          </div>
        </div>
      </section>
      <section className="landing__section blue-section">
        <div className="container-2">
          <h2 className="landing__section-title">pricing</h2>
          <div className="flex-space-around">
            <div className="landing__pricing-item">
              <h2>free plan</h2>
              <p>Rota Management</p>
              <p>Up to 15 Employees</p>
              <p>1 Department</p>
              <p>Export Shifts to Print</p>
              <p>Email Staff on Publish</p>
              <h3>Free</h3>
            </div>
            <div className="landing__pricing-item">
              <h2>premium plan</h2>
              <p>Free Plan Features</p>
              <p>Availability</p>
              <p>Holiday Requests</p>
              <p>Shift Swapping</p>
              <p>Unlimited Departments</p>
              <p>Up to 50 Employees</p>
              <h3>£20 per month</h3>
            </div>
          </div>
        </div>
      </section>
      <section className="landing__section">
        <div className="container-2">
          <div className="landing__start-now">
            <h2 className="landing__section-title">start saving time now</h2>
            <p>join rotaready for free</p>
            <Link to="/register">
              <button className="btn-5">Sign up</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
