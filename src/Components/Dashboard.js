import React from "react";
import Form from "./Form";
import Now_Playing_Movies  from "./Now_Playing_Movies";

const Dashboard = () => {
  return (
    <div>
      <header>7art</header>
      <div className="search-area">
        
      </div>
      <div className="results">
        <Now_Playing_Movies />
      </div>
    </div>
  );
};

export default Dashboard;
