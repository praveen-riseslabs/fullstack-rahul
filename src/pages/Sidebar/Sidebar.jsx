import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // Import the CSS file

const Sidebar = () => {
  return (
    <aside>
      <div className="top">
        <div className="logo">
          <img src="./rises.jpeg" alt="" />
          {/* <h2>Vega</h2> */}
        </div>
        <div className="close" id="close-btn">
          <span className="material-icons-sharp"> close </span>
        </div>
      </div>
      <div className="sidebar">
        <NavLink exact to="/" activeClassName="active">
          <span class="material-symbols-outlined">medication</span>
          <h4> Health record</h4>
        </NavLink>
        {/* Add other links */}
        <NavLink to="/customers" activeClassName="active">
          <span class="material-symbols-outlined">support_agent</span>
          <h4>Customers</h4>
        </NavLink>
        <NavLink to="/orders" activeClassName="active">
          <span class="material-symbols-outlined">receipt_long</span>
          <h4>Orders</h4>
        </NavLink>
        {/* Add more links */}
      </div>
    </aside>
  );
};

export default Sidebar;
