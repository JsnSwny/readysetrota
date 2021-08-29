import React from "react";
import Feature from "./Feature";

const Landing = () => {
  return (
    <div className="landing">
      <section className="hero section">
        <div className="hero__wrapper wrapper--lg">
          <div className="hero__left">
            <h1>Improve the way you manage your rotas.</h1>
            <p>
              readysetrota is an intuitive application which aims to make your
              life easier
            </p>
            <button>Try it for FREE</button>
            <button className="blue">Watch Demo</button>
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
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi congue non egestas sed odio viverra sit."
            />
            <Feature
              title="Advanced Availability Management"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi congue non egestas sed odio viverra sit."
            />
            <Feature
              title="Advanced Availability Management"
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi congue non egestas sed odio viverra sit."
            />
          </div>
        </div>
      </section>
      <section className="section">
        <div className="landing__wrapper wrapper--lg">
          <h2 className="radial-underline">What Our Users Think</h2>
          <div className="usersThink">
            <div className="usersThink__item">
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
            </div>
            <div className="usersThink__item">
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
            </div>
          </div>
        </div>
      </section>

      <section className="section section--white">
        <div className="landing__wrapper wrapper--lg">
          <h2 className="radial-underline">Pricing</h2>
          <h3 class="landing__subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nisl
            commodo, quis elementum ac. Elit ac lectus eu lobortis.
          </h3>
          <div className="pricing">
            <div className="pricing__item">
              <h3>Free Plan</h3>
              <h5>Completely Free</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                ultricies pharetra sagittis non.
              </p>
              <button>Learn More</button>
            </div>
            <div className="pricing__item">
              <h3>Premium Plan</h3>
              <h5>£3 per 5 Employees</h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                ultricies pharetra sagittis non.
              </p>
              <button>Learn More</button>
            </div>
          </div>
        </div>
      </section>
      <section className="landing__banner">
        <h2>Try it now for FREE</h2>
        <p>Getting set up is quick and easy</p>
        <button className="btn-3">Try Now</button>
      </section>
      <footer>
        <div className="wrapper--lg flex-container--between">
          <div>
            <img src="static/media/logo-3.svg" />
            <p>Privacy Policy | Terms and Conditions</p>
          </div>

          <div className="flex-container">
            <i class="fab fa-linkedin"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-facebook-square"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
