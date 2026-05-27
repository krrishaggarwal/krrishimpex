import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Sidebar.css";

const Sidebar = ({ newQuotations, newContacts, mobileOpen, onMobileClose }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const handleNavClick = () => {
    if (onMobileClose) onMobileClose();
  };

  return (
    <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>

      {/* Header */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          {sidebarCollapsed ? "AP" : "Admin Panel"}
        </h2>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button
            className="sidebar-toggle desktop-only"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? "→" : "←"}
          </button>
          {/* Mobile close button */}
          <button
            className="sidebar-toggle mobile-only"
            onClick={onMobileClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <NavLink
          to="/admin/dashboard/products"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
          onClick={handleNavClick}
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
          onClick={handleNavClick}
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
          onClick={handleNavClick}
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
        <button className="logout-btn" onClick={handleLogout}>
          {sidebarCollapsed ? "→" : "Logout"}
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;