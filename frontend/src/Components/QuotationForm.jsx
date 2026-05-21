import React, { useState, useEffect } from "react";
import { apiUrl } from "../utils/api";
import "../styles/Products.css";

const QuotationForm = ({ productName, productImage, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product_name: productName || "",
    quantity: "",
    message: "",
  });

  // Update product_name if prop changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, product_name: productName || "" }));
  }, [productName]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(apiUrl("/quotes"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(`Quotation request submitted for ${productName}! We will contact you soon.`);
        setFormData({
          name: "",
          email: "",
          phone: "",
          product_name: productName || "",
          quantity: "",
          message: "",
        });
        onClose();
      } else {
        alert("Failed to submit. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal quote-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="quote-product-panel">
          <h2>Request Quotation for <br />{productName}</h2>
          {productImage && (
            <img
              className="quote-product-image"
              src={productImage}
              alt={productName}
            />
          )}
        </div>

        <form className="quote-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            readOnly
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message / Requirements"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <div className="modal-actions">
            <button type="submit" className="quote-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuotationForm;
