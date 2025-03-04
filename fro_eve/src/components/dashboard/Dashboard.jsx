import React from "react";
import  "./Dashboard.css"
import DashboardLeft from "../dashboardleft/DashboardLeft";
import { Outlet } from "react-router-dom";
function Dashboard() {
  return (
    <>
      <div className="dashboard-main">
        <div className="dashboard-left">
            <DashboardLeft/>
        </div>
        <div className="dashboard-right">
            <Outlet/>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
