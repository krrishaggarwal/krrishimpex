import React, { useState, useEffect } from "react";
import "../../styles/ContactsManagement.css";
import { adminFetch } from "../../utils/api";

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts from backend
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await adminFetch("/admin/contacts");
        const { contacts } = await res.json(); // destructure
        setContacts(contacts);
      } catch (err) {
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // Toggle Complete / Incomplete status
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";

    try {
      const res = await adminFetch(`/admin/contacts/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const { contact } = await res.json();

      setContacts(
        contacts.map((c) => (c.id === id ? contact : c))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await adminFetch(`/admin/contacts/${id}`, { method: "DELETE" });
      setContacts(contacts.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  // Display mapping for frontend
  const displayStatus = (status) => (status === "completed" ? "Complete" : "Incomplete");

  return (
    <div className="contacts-container">
      <h2 className="contacts-title">Contacts Management</h2>

      {loading ? (
        <p className="info-text">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="info-text">No contacts found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.subject}</td>
                  <td>{c.message}</td>
                  <td
                    className={
                      c.status === "completed" ? "status-complete" : "status-incomplete"
                    }
                  >
                    {displayStatus(c.status)}
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => toggleStatus(c.id, c.status)}
                      className="btn btn-warning"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => deleteContact(c.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactsManagement;
