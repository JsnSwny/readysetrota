import React, { useState } from "react";
import Feature from "./Feature";
import { Link } from "react-router-dom";

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
                Try it for FREE
              </Link>
              <button
                onClick={() => {
                  setShowVideo(true);
                  document.body.style.overflow = "hidden";
                }}
                className="hero__btn blue"
              >
                Watch Demo
              </button>
            </div>

            <small>Full Release Coming October 26th</small>
          </div>
          <img className="hero__image" src="static/media/hero-image.svg" />
        </div>
      </section>
      <section className="section section--white">
        <div className="landing__wrapper wrapper--lg">
          <h2 className="radial-underline">Features</h2>
          <div className="features">
            <Feature
              title="Advanced Availability Management"
              content="Manage holidays and know exactly who you have available when planning your rota with our advanced availability management."
            />
            <Feature
              title="Labour Forecasting"
              content="Track employee wages and set daily sales forecasts to get a better representation of labour costs against your revenue."
            />
            <Feature
              title="User Permissions"
              content="Have full control over what your employees can see and do with our custom user permissions."
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="landing__wrapper wrapper--lg">
          <h2 className="radial-underline">What Our Users Think</h2>
          <div className="usersThink">
            <div className="usersThink__item">
              <img src="static/media/montlogo.jpg" />
              <div className="usersThink__right">
                <h3>
                  Paul <strong>Patterson</strong>
                </h3>
                <p>
                  Manager at{" "}
                  <a href="https://www.themontgomerie.co.uk">
                    The Montgomerie Restaurant
                  </a>
                </p>
                <blockquote>
                  Using ReadySetRota has saved management a lot of admin time.
                  Not only that, we can now plan rotas more cost effectively
                  thanks to live and accurate staff wage costs. The rota and
                  time sheets have never been so straightforward. It’s a
                  fantastic and innovative tool!
                </blockquote>
              </div>
            </div>
            {/* <div className="usersThink__item">
              <img src="static/media/dwayne-the-rock-.jpg" />
              <div className="usersThink__right">
                <h3>
                  Paul <strong>Patterson</strong>
                </h3>
                <p>
                  Manager at{" "}
                  <a href="https://www.themontgomerie.co.uk">
                    The Montgomerie Restaurant
                  </a>
                </p>
                <blockquote>
                  Using ReadySetRota has saved management a lot of admin time.
                  Not only that, we can now plan rotas more cost effectively
                  thanks to live and accurate staff wage costs. The rota and
                  time sheets have never been so straightforward. It’s a
                  fantastic and innovative tool!
                </blockquote>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="landing__wrapper wrapper--lg">
          <h2 className="radial-underline">Pricing</h2>
          <h4 class="landing__subtitle">
            We offer a free and premium plan so that whether you're a small or
            large business, you can benefit from readysetrota.
          </h4>
          <div className="pricing">
            <div className="pricing__item">
              <h3>Free Plan</h3>
              <p>
                Completely <strong>Free</strong>
              </p>
              <small>
                The free plan offers a stripped back version of the application,
                only allowing the bare minimum of creating employees and shifts.
                Ideal for small businesses.
              </small>
              <button>More Info Coming Soon</button>
            </div>
            <div className="pricing__item pink">
              <h3>Premium Plan</h3>
              <p>
                <strong>£3</strong> per <strong>5</strong> Employees
              </p>
              <small>
                The premium plan includes advanced features to further improve
                your rota management. These features include availability
                management, labour forecasting, custom employee permissions and
                more.
              </small>
              <button>More Info Coming Soon</button>
            </div>
          </div>
        </div>
      </section>
      <section className="landing__banner">
        <h2>Try it now for FREE</h2>
        <p>Getting set up is quick and easy</p>
        <button
          onClick={() => {
            setOpen(true);
            setType("register");
          }}
          className="btn-3"
        >
          Try Now
        </button>
      </section>
      <footer className="footer">
        <div className="wrapper--lg flex-container--between">
          <div>
            <img src="static/media/logo-3.svg" />
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
