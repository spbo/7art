import React from "react";
import Search from "./Search";
import Now_Playing_Movies  from "./Now_Playing_Movies";

const Dashboard = () => {
  return (
    <div>
      <header>7art</header>
      <div className="search-area">
        <Search />
      </div>
      <div className="results">
        <Now_Playing_Movies />
      </div>
    </div>
  );
};

export default Dashboard;
