
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Profile</h3>
      <nav>
        <NavLink
          to="/setup"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Profile Setup
        </NavLink>
        <br />

        <NavLink to="/view" className="nav-link">
          View Profile
        </NavLink>
        <br />
        <NavLink to="/insights" className="nav-link">
          Insights
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
