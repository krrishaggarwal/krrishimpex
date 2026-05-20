import React, { useState } from "react";
import BackToTop from "../Components/BackToTop";
import { apiUrl } from "../utils/api";
import "../styles/ContactUs.css";

import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(apiUrl("/contacts"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                alert("✅ Message sent successfully!");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "General Inquiry",
                    message: "",
                });
            } else {
                alert("❌ Failed to send message.");
            }
        } catch (err) {
            console.error(err);
            alert("⚠️ Server error. Try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <section className="contact-section">
                <div className="container">
                    <h1 className="section-title">Get In Touch</h1>
                    <div className="contact-container">
                        {/* Left Side - Contact Info */}
                        <div className="contact-box">
                            <h3>Our Contact Details</h3>
                            <div className="contact-method">
                                <FaLocationDot />
                                <div className="contact-method-content">
                                    <h4>Address</h4>
                                    <p>
                                        Gali NO 4, 692/1, Dharma Raja Marg,
                                        <br /> Opp. S.S. building materials, near pipal Chowk,
                                        <br /> Rana Park Road, Siraspur, Delhi, 110042
                                    </p>
                                </div>
                            </div>
                            <div className="contact-method">
                                <FaPhone />
                                <div className="contact-method-content">
                                    <h4>Phone</h4>
                                    <p>
                                        +91 7011949384 <br /> +91 9899373580
                                    </p>
                                </div>
                            </div>
                            <div className="contact-method">
                                <MdEmail />
                                <div className="contact-method-content">
                                    <h4>Email</h4>
                                    <p>
                                        support@krrishimpex.com<br />
                                        info@krrishimpex.com<br />
                                        sales@krrishimpex.com
                                    </p>
                                </div>
                            </div>
                            <div className="contact-method">
                                <IoTimeSharp />
                                <div className="contact-method-content">
                                    <h4>Business Hours</h4>
                                    <p>
                                        Monday - Saturday
                                        <br />
                                        10:00 AM - 7:00 PM
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="contact-box">
                            <h3>Send Us a Message</h3>
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    >
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Get Quotation">Get Quotation</option>
                                        <option value="Product Information">Product Information</option>
                                        <option value="Order Inquiry">Order Inquiry</option>
                                        <option value="Customer Support">Customer Support</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="contact-section">
                <div className="container">
                    <h2 className="section-title">Our Location</h2>
                    <div className="map-container">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.714356899496!2d77.13045447375875!3d28.75794417837769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d016a7b05f04d%3A0x3b5e1f3d253e9290!2sKRRISH%20IMPEX%20(%20KRRISH%20ECOWARE%20INDUSTRIES%20PVT%20LTD%20)!5e0!3m2!1sen!2sin!4v1744740422413!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Krrish Impex Location"
                        ></iframe>
                    </div>
                </div>
            </section>

            <BackToTop />
        </>
    );
};

export default ContactUs;
