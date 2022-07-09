import React, { useState, useRef, useEffect } from "react";
import Feature from "./Feature";
import { Link } from "react-router-dom";
import HowItWorks from "./HowItWorks";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Landing = ({ setOpen, setType }) => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="landing">
      <div className={`video-modal ${showVideo ? "open" : ""}`}>
        <i
          className="fas fa-times video-modal__close"
          onClick={() => {
            setShowVideo(false);
            document.body.style.overflow = "auto";
          }}
        ></i>
        <iframe
          src="https://www.youtube.com/embed/SEhEmfoQNT8"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <section className="hero section">
        <div className="hero__wrapper wrapper--lg">
          <div className="hero__left">
            <h1>Improve the way you manage your rotas.</h1>
            <p>
              readysetrota is an intuitive application which aims to make your
              life easier
            </p>
            <div className="hero__btn-wrapper">
              <Link className="hero__btn" to="/register">
                Start 30-day free trial
              </Link>

              {/* <button
                onClick={() => {
                  toast.error("New demo video coming soon");
                }}
                className="hero__btn--blue"
              >
                <i class="fas fa-play-circle"></i> Watch Demo
              </button> */}
            </div>
          </div>
          <img className="hero__image" src="static/media/hero-image.svg" />
        </div>
      </section>
      <section className="section section--white">
        <div className="landing__wrapper wrapper--lg">
          <h2>How it works</h2>
          <HowItWorks />
        </div>
      </section>
      <section className="section">
        <div className="landing__wrapper wrapper--lg">
          <h2>Testimonials</h2>
          <div className="usersThink">
            <div className="usersThink__item">
              <i className="fas fa-quote-left"></i>
              <blockquote>
                Using ReadySetRota has saved management a lot of admin time. Not
                only that, we can now plan rotas more cost effectively thanks to
                live and accurate staff wage costs. The rota and time sheets
                have never been so straightforward. It’s a fantastic and
                innovative tool!
              </blockquote>
              <div className="flex-container--align-center">
                <img src="static/media/montlogo.jpg" />
                <div className="usersThink__item-details">
                  <h4>Paul Patterson</h4>

                  <a href="https://www.themontgomerie.co.uk">
                    The Montgomerie Restaurant
                  </a>
                </div>
              </div>
            </div>
            <div className="usersThink__item alt">
              <i className="fas fa-quote-left"></i>
              <blockquote className="alt">
                Join now and give us your feedback!
              </blockquote>
              <div className="flex-container--align-center">
                <Link className="btn-3" to="/register">
                  Get Started
                </Link>
              </div>
            </div>
            <div className="usersThink__item alt">
              <i className="fas fa-quote-left"></i>
              <blockquote className="alt">
                Join now and give us your feedback!
              </blockquote>
              <div className="flex-container--align-center">
                <Link className="btn-3" to="/register">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="landing__wrapper wrapper--lg">
          <h2>Pricing</h2>
          <h4 class="landing__subtitle">
            We offer one plan that gives you access to all of the features.
          </h4>
          <div className="pricing">
            {/* <div className="pricing__item">
              <p>Free</p>
              <h3>Basic</h3>
              <ul>
                <li>
                  <i className="fas fa-check-circle"></i> Unlimited Departments
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Up to 15 Employees
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Create and Publish
                  Shifts
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Export Rota
                </li>
              </ul>
              <Link className="btn-3" to="/register">
                Get Started
              </Link>
            </div> */}
            <div className="pricing__item">
              <p>£5/per 5 employees</p>
              <h3>Premium</h3>
              <ul>
                {/* <li>
                  <i className="fas fa-check-circle"></i> Everything in Basic
                </li> */}
                <li>
                  <i className="fas fa-check-circle"></i> Unlimited Sites and
                  Departments
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Availability
                  Management Tracking
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Labour Forecasting
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Time Tracking
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Reporting
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Custom Employee
                  Permissions
                </li>
              </ul>
              <Link className="btn-3" to="/register">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="landing__banner">
        <h2>Get Started Now</h2>
        <p>
          Start your free 30-day trial today, getting setup is quick and easy
        </p>
        <Link to="/register" className="btn-3">
          Start 30-day free trial
        </Link>
      </section>
      <footer className="footer">
        <div className="wrapper--lg flex-container--between">
          <div>
            <img src="static/media/nav-logo.svg" />
            <p>
              <Link to="privacy">Privacy Policy</Link> |{" "}
              <Link to="terms">Terms and Conditions</Link>
            </p>
          </div>

          <div className="flex-container">
            <a
              className="footer__link"
              href="https://www.linkedin.com/company/readysetcore"
              target="_blank"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a
              className="footer__link"
              href="https://www.instagram.com/readysetrota"
              target="_blank"
            >
              <i class="fab fa-instagram"></i>
            </a>

            <a
              className="footer__link"
              href="https://www.facebook.com/readysetrota"
              target="_blank"
            >
              <i class="fab fa-facebook-square"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
