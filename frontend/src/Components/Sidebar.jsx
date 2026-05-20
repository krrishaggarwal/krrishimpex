import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ newQuotations, newContacts }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>

      {/* Header */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          {sidebarCollapsed ? "AP" : "Admin Panel"}
        </h2>

        <button
          className="sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <NavLink
          to="/admin/dashboard/products"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="link-icon">📦</span>
          {!sidebarCollapsed && (
            <span className="link-text">Manage Products</span>
          )}
        </NavLink>

        <NavLink
          to="/admin/dashboard/quotations"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="link-icon">📋</span>

          {!sidebarCollapsed && (
            <>
              <span className="link-text">Manage Quotations</span>
              {newQuotations && (
                <span className="notification-badge">3</span>
              )}
            </>
          )}

          {sidebarCollapsed && newQuotations && (
            <span className="notification-dot"></span>
          )}
        </NavLink>

        <NavLink
          to="/admin/dashboard/contacts"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="link-icon">👥</span>

          {!sidebarCollapsed && (
            <>
              <span className="link-text">Manage Contacts</span>
              {newContacts && (
                <span className="notification-badge">1</span>
              )}
            </>
          )}

          {sidebarCollapsed && newContacts && (
            <span className="notification-dot"></span>
          )}
        </NavLink>

      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {!sidebarCollapsed && (
          <p className="user-info">Logged in as Admin</p>
        )}
      </div>

    </aside>
  );
};

export default Sidebar;