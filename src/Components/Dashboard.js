import React from "react";
import Form from "./Form";
import Movies from "./Movies";

const Dashboard = () => {
  return (
    <div>
      <header>7art</header>
      <div className="search-area">
        <Form />
      </div>
      <div className="results">
        <Movies />
      </div>
    </div>
  );
};

export default Dashboard;
