import React from "react";
import MoviesList from "./MoviesList";

const Dashboard = () => {
  return (
    <div className="">
      <header className="header">7art</header>
      <div className="results">
        <MoviesList />
      </div>
    </div>
  );
};

export default Dashboard;
