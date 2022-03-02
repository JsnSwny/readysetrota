import React from "react";
import WorkCard from "./WorkCard";

const HowItWorks = () => {
  return (
    <div className="work-cards flex-container--between">
      <WorkCard
        icon="sitemap"
        title="1. Business Hierarchy"
        description="Easily layout your hierarchy of sites, departments, positions and employees exactly as you wish."
      />
      <WorkCard
        icon="calendar-check"
        title="2. Create Rota"
        description="Add shifts for your employees to the rota and publish for them to see."
      />
      <WorkCard
        icon="chart-line"
        title="3. Track Financials"
        description="Set your daily forecasts to track predicted and actual labour costs as a report."
      />
      <WorkCard
        icon="wine-glass"
        title="4. Relax"
        description="With the time saved, pour yourself a drink and you'll still have extra time to dedicate to more important tasks"
      />
    </div>
  );
};

export default HowItWorks;
