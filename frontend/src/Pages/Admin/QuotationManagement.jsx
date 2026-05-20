// frontend/src/components/admin/QuotationManagement.jsx
import React, { useState, useEffect } from "react";
import "../../styles/ContactsManagement.css"; // reuse CSS
import { adminFetch } from "../../utils/api";

const QuotationManagement = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch quotations
  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const res = await adminFetch("/admin/quotations");
        const data = await res.json();
        setQuotations(data.quotations || []);
      } catch (err) {
        console.error("Error fetching quotations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotations();
  }, []);

  // Toggle status
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      const res = await adminFetch(
        `/admin/quotations/${id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const { quotation } = await res.json();
      setQuotations(
        quotations.map((q) => (q.id === id ? quotation : q))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete quotation
  const deleteQuotation = async (id) => {
    try {
      await adminFetch(
        `/admin/quotations/${id}`,
        { method: "DELETE" }
      );
      setQuotations(quotations.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Error deleting quotation:", err);
    }
  };

  // Map status
  const displayStatus = (status) =>
    status === "completed" ? "Complete" : "Pending";

  return (
    <div className="contacts-container">
      <h2 className="contacts-title">Quotations Management</h2>

      {loading ? (
        <p className="info-text">Loading quotations...</p>
      ) : quotations.length === 0 ? (
        <p className="info-text">No quotations found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="contacts-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {quotations.map((q) => (
                <tr key={q.id}>
                  <td>{q.name}</td>
                  <td>{q.email}</td>
                  <td>{q.phone}</td>
                  <td>{q.product_name}</td>
                  <td>{q.quantity}</td>
                  <td>{q.message}</td>
                  <td
                    className={
                      q.status === "completed"
                        ? "status-complete"
                        : "status-incomplete"
                    }
                  >
                    {displayStatus(q.status)}
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => toggleStatus(q.id, q.status)}
                      className="btn btn-warning"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => deleteQuotation(q.id)}
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

export default QuotationManagement;
