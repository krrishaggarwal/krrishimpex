import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar";
import "../../styles/Sidebar.css";
import { TiThMenu } from "react-icons/ti";

const Dashboard = () => {
  const [newQuotations] = useState(true);
  const [newContacts] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="dashboard-wrapper">
      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        newQuotations={newQuotations}
        newContacts={newContacts}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Dynamic Content */}
      <main className="dashboard-content">
        {/* Mobile header bar */}
        <div className="mobile-topbar">
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open menu"
          >
            <TiThMenu size={22} />
          </button>
          <span className="mobile-topbar-title">Admin Panel</span>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;