import React, { useState, Fragment } from "react";

const Feature = () => {
  const [currentFeature, setCurrentFeature] = useState("availability");
  return (
    <section className="landing__section">
      <div className="container-2">
        <h2 className="landing__section-title">features</h2>
        <p className="landing__section-subtitle">
          readysetrota offers many features to save you time when making up your
          rota, here are just some of the features available.
        </p>
        <div className="landing__features-list">
          <p
            className={`${currentFeature == "availability" ? "active" : ""}`}
            onClick={() => {
              setCurrentFeature("availability");
            }}
          >
            Availability/Holidays
          </p>
          <p
            className={`${currentFeature == "shifts" ? "active" : ""}`}
            onClick={() => {
              setCurrentFeature("shifts");
            }}
          >
            Shift Management
          </p>
          <p
            className={`${currentFeature == "departments" ? "active" : ""}`}
            onClick={() => {
              setCurrentFeature("departments");
            }}
          >
            Department Organisation
          </p>
        </div>
        <div className={`landing__features-content`}>
          <img src={`/static/media/${currentFeature}.png`} />
          {currentFeature == "availability" && (
            <div>
              <p>
                Using readysetrota's easy-to-use Calendar UI, employees can
                simply select their availability using the various option of
                "Unavailable", "Available", "Partially Available" and "Holiday".
                Availabilities are reflected on the rota as a toggleable option,
                this gives you a better overview of who is available when
                creating your rotas.
              </p>
              <br />
              <p>
                On your business profile you will find a Holiday Requests
                section where you can approve/decline holiday requests, this
                will also show on the rota as a holiday when approved and
                employees will be able to see their request status on their
                profile.
              </p>
            </div>
          )}
          {currentFeature == "shifts" && (
            <div>
              <p>
                Manage your shifts with ease in the rota page. Sort shifts by
                day so you can focus on one day at a time and get a better view
                of which employees you have available. Want to have a physical
                copy of your rota? You can export all the shifts for the week
                you are viewing as a PDF in one click.
              </p>
              <br />
              <p>
                Once you have created your businesses upcoming shifts, simply
                click the "Publish" button and watch as all of your shifts
                become visible for your employees, as well as this an email will
                be sent to each employee with all of their upcoming shifts so
                there is no excuse for them not to see it.
              </p>
            </div>
          )}
          {currentFeature == "departments" && (
            <div>
              <p>
                Keep your departments, positions and staff organised with your
                own personal business profile. Each department can contain its
                own positions/staff, allowing you to filter your staff to reduce
                cluster when creating rotas.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Feature;
