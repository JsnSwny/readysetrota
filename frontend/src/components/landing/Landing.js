import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Feature from "./Feature";
import axios from "axios";
import Loading from "../common/Loading";
import { toast } from "react-toastify";

const Landing = () => {
  const [employees, setEmployees] = useState(10);
  const [amountPerMonth, setAmountPerMonth] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAmountPerMonth(((employees - 10) / 5) * 3 + 6);
  }, [employees]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.warning("You are missing a field");
      return false;
    }
    setLoading(true);
    let obj = { name, email, message };
    axios
      .post(`sendmessage/`, obj)
      .then(() => {
        setName("");
        setEmail("");
        setMessage("");
        setLoading(false);
        toast.success("Message sent successfully!");
      })
      .catch(() => setLoading(false));
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      {loading && <Loading />}
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
          <iframe
            src="https://www.youtube.com/embed/vLT36DLVaSo"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      <section className="landing__section">
        <div className="">
          <h2 className="landing__section-title">about</h2>
          <div className="landing__about">
            <img src="/static/media/about.jpg" />
            <p>
              My name is Jason Sweeney and I am a 21 year old computer science
              student based in Edinburgh. For the last 3 years I have worked in
              hospitality and have always felt that there should be a much
              easier way to create and receive my schedule.
              <br />
              <br />
              So in March 2020, during lockdown I began readysetrota, an easy to
              use application which aims to simplify the way businesses manage
              their rotas. I wanted to give as much control and information to
              the users in as few pages as possible.
              <br />
              <br />
              From registering to having all of your positions, staff and shifts
              created can take only minutes. I want to continue to build and
              grow readysetrota as a must have application for any business that
              relies on managing rotas.
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
              <i className="far fa-calendar"></i>
              <p>
                From working in the hospitality industry I have first-hand
                experience of receiving a rota and I have used this in helping
                me build this application.
              </p>
            </div>
            <div className="landing__chooseus-item">
              <i className="far fa-comments"></i>
              <p>
                As I have independently built this application from the ground
                up, you will receive one-to-one interaction with myself to
                assist you with any queries or suggestions you may have.
              </p>
            </div>
            <div className="landing__chooseus-item">
              <i className="fas fa-money-bill-wave"></i>
              <p>
                With the option to use readysetrota for free, you can also
                upgrade to premium features for a guaranteed cheaper price to
                any other rota applications.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Feature />
      <section className="landing__section blue-section">
        <div className="container-2">
          <h2 className="landing__section-title">pricing</h2>
          <div className="landing__pricing">
            <label>How many employees do you have?</label>
            <h2>{employees}</h2>
            <input
              type="range"
              id="points"
              name="points"
              min="10"
              max="250"
              step="5"
              className="slider"
              onChange={(e) => {
                setEmployees(e.target.value);
              }}
              value={employees}
            />
          </div>
          {employees <= 5 ? (
            <div className="landing__pricing-item">
              <h2>free plan</h2>
              <ul>
                <li>Free Rota Management</li>
                <li>Up to 10 Employees</li>
                <li>1 Department</li>
              </ul>

              <h3>Free</h3>
            </div>
          ) : (
            <div className="landing__pricing-item">
              <h2>premium plan</h2>
              <ul>
                <li>Unlimited Employees</li>
                <li>Unlimited Departments</li>
                <li>Staff Availability</li>
                <li>Holiday Requests</li>
                <li>Early Access to New Features</li>
              </ul>

              <h3>£{amountPerMonth} per month</h3>
              <p>or</p>
              <h4 style={{ fontSize: "24px" }}>
                £
                {Math.ceil(
                  amountPerMonth * 12 - ((amountPerMonth * 12) / 100) * 20
                )}{" "}
                per year
              </h4>
            </div>
          )}
        </div>
      </section>
      <section className="landing__section">
        <div className="container-2">
          <h2 className="landing__section-title">contact</h2>
          <div className="landing__contact">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control input-1"
                  name="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control input-1"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-control input-1"
                  name="message"
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  value={message}
                ></textarea>
              </div>
              <button className="btn-5">Send message</button>
            </form>
          </div>
        </div>
      </section>
      <section className="landing__section blue-section">
        <h2 className="landing__section-title">join</h2>
        <div className="landing__join">
          <p className="landing__section-subtitle">
            start saving time and use readysetrota to manage your schedules
          </p>
          <Link to="/register">
            <button className="btn-5">Join for Free</button>
          </Link>
        </div>
      </section>
      <footer>
        readysetrota<span>&nbsp;|&nbsp;</span>
        <p>
          developed by&nbsp;
          <a href="https://www.facebook.com/sweeneysolutionsuk" target="_blank">
            Jason Sweeney
          </a>
        </p>
        <span>&nbsp;|&nbsp;</span> <Link to="privacy">Privacy Policy</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link to="terms">Terms and Conditions</Link>
      </footer>
    </div>
  );
};

export default Landing;
