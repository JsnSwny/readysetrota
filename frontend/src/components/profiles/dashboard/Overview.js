import React from "react";

const Overview = () => {

    return (
        <div className="dashboard__block">
            <div className="dashboard__block-title-container">
                <p className="dashboard__block-title">
                    Overview
                </p>
            </div>
            <div className="overview flex-container--wrap">
                <div className="overview__item flex-container--column-center">
                    <h4>Hours</h4>
                    <p>60</p>
                </div>
                <div className="overview__item flex-container--column-center">
                    <h4>Hours</h4>
                    <p>60</p>
                </div>
                <div className="overview__item flex-container--column-center">
                    <h4>Hours</h4>
                    <p>60</p>
                </div>
            </div>
        </div>
    )
}

export default Overview;