import React from "react";
import logo from "../assets/imgs/logo.png"

import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoTimeSharp } from "react-icons/io5";

import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-column">
                        <h3>About Krrish Ecoware Industries PVT. LTD.</h3>
                        <img src={logo} alt="logo" height={70} />
                        <p>
                            Leading manufacturer of eco-friendly disposable cutlery and food service products since 2001.
                            We combine quality, sustainability, and innovation to serve businesses across India and beyond.
                        </p>
                        <div className="social-links">
                            <a href="https://www.facebook.com/profile.php?id=100085145831452"><FaFacebookF /></a>
                            <a href="https://x.com/ImpexKrris93903?t=WvTuF8TlR-cG4TCIN3Wuuw&s=09"><BsTwitterX /></a>
                            <a href="https://www.instagram.com/krrish.impex/"><FaInstagram /></a>
                            <a href="https://www.linkedin.com/in/krrish-impex-629384313/"><FaLinkedinIn /></a>
                            <a href="https://share.google/kOm6nl3ZTc5JsiPtg"><FaGoogle /></a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/products">Products</a></li>
                            <li><a href="/certifications">Certifications</a></li>
                            <li><a href="/infrastructure">Infrastructure</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="https://www.indiamart.com/krrish-impex/profile.html?srsltid=AfmBOoocbVNGNg0npyfWBqND_SHwPGAvuCaLlrI27uzQQfHhu8dKJClS">IndiaMART</a></li>
                            <li><a href="https://www.tradeindia.com/krrish-impex-82467799/">TradeIndia</a></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Contact Information</h3>
                        <ul>
                            <li>
                                <FaLocationDot /> GALI NO 4, 692/1, Dharma Raja Marg, opp. S.S. building materials,
                                near pipal Chowk, Rana Park Road, Siraspur, Delhi, 110042
                            </li>
                            <li>
                                <FaPhone />
                                <a href="tel:+917011949384">+91 7011949384</a>, <br />
                                <a href="tel:+919899373580">+91 9899373580</a>
                            </li>
                            <li className="emails">
                                <MdEmail />
                                <div>
                                    <a href="mailto:support@krrishimpex.com">support@krrishimpex.com</a> <br />
                                    <a href="mailto:info@krrishimpex.com">info@krrishimpex.com</a><br />
                                    <a href="mailto:sales@krrishimpex.com">sales@krrishimpex.com</a>
                                </div>
                            </li>

                            <li>
                                <IoTimeSharp /> Mon - Sat: 10:00 AM - 7:00 PM
                            </li>
                        </ul>

                    </div>
                </div>

                <div className="copyright">
                    <p>&copy; 2025 Krrish Ecoware Industries PVT. LTD. | All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
