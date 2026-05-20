import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import "../../styles/Sidebar.css";

const Dashboard = () => {
  const [newQuotations] = useState(true);
  const [newContacts] = useState(false);

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <Sidebar
        newQuotations={newQuotations}
        newContacts={newContacts}
      />

      {/* Dynamic Content */}
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
