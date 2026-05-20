// AboutUs.jsx
import React, { useState, useEffect, memo } from "react";
import BackToTop from "../Components/BackToTop";
import "../styles/AboutUs.css";

// Director Images
import RS from "../assets/imgs/rs.jpg";
import NS from "../assets/imgs/ns.jpg";

// Certification Images
import IndiaMart from "../assets/imgs/india_mart.png";
import TradeIndia from "../assets/imgs/tradeindia.png";
import ISO from "../assets/imgs/iso.png";
import Govt from "../assets/imgs/govt.png";

// Icons
import { FaEye } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";

// Memoized Certification Card Component
const CertificationCard = memo(({ cert }) => (
    <div className="cert-card">
        <img src={cert.src} alt={cert.title} loading="lazy" />
        <h3>{cert.title}</h3>
        <p>{cert.desc}</p>
    </div>
));

const AboutUs = () => {
    const timelineData = [
        {
            year: "2001",
            title: "Company Foundation",
            desc: "Singla Enterprises was established with a vision to deliver quality disposable food service products, beginning with a modest paper plate manufacturing setup."
        },
        {
            year: "2004",
            title: "First Expansion",
            desc: "Expanded operations into large-scale paper plate production to meet rising demand."
        },
        {
            year: "2006",
            title: "Official Registration",
            desc: "Formally registered as Singla Enterprises, strengthening our presence in the industry."
        },
        {
            year: "2008",
            title: "Product Diversification",
            desc: "Introduced a wider range of disposable products, broadening our offerings for customers."
        },
        {
            year: "2010",
            title: "Second Manufacturing Unit",
            desc: "Established a new production facility in Siraspur, Delhi, to scale operations and efficiency."
        },
        {
            year: "2015",
            title: "Global Trade Entry",
            desc: "Secured an import-export license under the name KRRISH IMPEX, stepping into international markets."
        },
        {
            year: "2016",
            title: "Consolidated Manufacturing",
            desc: "Merged both factories into a larger, centralized unit in Siraspur for streamlined operations."
        },
        {
            year: "2017",
            title: "In-House Product Expansion",
            desc: "Launched in-house production of Aluminium Foil Wrap, Butter Paper Wrap, Toothpicks, and Cling Film."
        },
        {
            year: "2018",
            title: "New Disposable Solutions",
            desc: "Expanded portfolio with in-house production of Bouffant Caps, Garbage Bags, Paper Lids, Hand Gloves, Pizza & Popcorn Bowls."
        },
        {
            year: "2021",
            title: "Major Expansion & Certification",
            desc: "Acquired a larger industrial facility to support growth and proudly achieved ISO 9001:2015 certification, marking our commitment to global quality standards."
        },
        {
            year: "2025",
            title: "Rebranding & Incorporation",
            desc: "Rebranded as KRRISH ECOWARE INDUSTRIES PRIVATE LIMITED, operating under KRRISH IMPEX. Today, we stand as a trusted leader in high-quality disposable products, dedicated to timely delivery, customer trust, and eco-friendly solutions."
        },
    ];


    const certifications = [
        { src: IndiaMart, title: "IndiaMART Verified", desc: "Trusted and verified supplier on IndiaMART" },
        { src: TradeIndia, title: "TradeIndia Verified", desc: "Registered and verified member of TradeIndia" },
        { src: ISO, title: "ISO 9001:2015", desc: "Certified for quality management systems" },
        { src: Govt, title: "Government Registered", desc: "Registered with MSME and UDYAM" },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    // Automatic timeline rotation with cleanup
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % timelineData.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [timelineData.length]);

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <>
            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <h1 className="section-title">About Krrish Ecoware Industries PVT. LTD.</h1>
                    <div className="about-content">
                        <p>
                            Founded in 2001, Krrish Ecoware Industries PVT. LTD. has grown from a small manufacturing unit to a trusted name in the disposable products industry. Our journey began with a simple mission: to provide high-quality, eco-friendly disposable solutions that don't compromise on convenience or performance.
                        </p>
                        <p>
                            Today, we serve clients across India and internationally, offering an extensive range of disposable cutlery, plates, and food service products. Our state-of-the-art manufacturing facility in Delhi combines traditional craftsmanship with modern technology to deliver products that meet global standards.
                        </p>
                        <p>
                            What sets us apart is our unwavering commitment to sustainability. We continuously innovate to reduce our environmental impact while maintaining the quality and affordability our customers expect.
                        </p>
                    </div>
                </div>
            </section>

            {/* Directors Section */}
            <section className="about-section directors">
                <div className="container">
                    <h2 className="section-title">Our Directors</h2>
                    <div className="director-cards">
                        <div className="director-card">
                            <div className="director-img">
                                <img src={RS} alt="Portrait of Mr. Rajneesh Singla" width="120" height="120" loading="lazy" />
                            </div>
                            <h3>Mr. Rajneesh Singla</h3>
                            <p className="director-title">Director</p>
                            {/* <p className="director-quote">Phone: +919999379571</p> */}
                        </div>
                        <div className="director-card">
                            <div className="director-img">
                                <img src={NS} alt="Portrait of Mr. Naveen Singla" width="120" height="120" loading="lazy" />
                            </div>
                            <h3>Mr. Naveen Singla</h3>
                            <p className="director-title">Director</p>
                            {/* <p className="director-quote">Phone: +919899379580</p> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="timeline-section">
                <div className="container">
                    <h2 className="section-title">Our Journey</h2>

                    <div className="timeline-nav">
                        <ul>
                            {timelineData.map((item, idx) => (
                                <li key={item.year}>
                                    <button
                                        className={`timeline-nav-btn ${idx === activeIndex ? "active" : ""}`}
                                        onClick={() => handleClick(idx)}
                                        aria-label={`Jump to timeline item: ${item.year} - ${item.title}`}
                                    >
                                        {item.year}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="timeline-content-container">
                        {timelineData.map((item, idx) => (
                            <div key={item.year} className={`timeline-content-item ${idx === activeIndex ? "active" : ""}`}>
                                <div className="timeline-content-year">{item.year}</div>
                                <div className="timeline-content-body">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="about-section">
                <div className="container">
                    <h2 className="section-title vm">Our Vision & Mission</h2>
                    <div className="vm-grid">
                        <div className="vm-card">
                            <FaEye size={50} color="#ff1515" aria-hidden="true" />
                            <h3>Our Vision</h3>
                            <p>We envision a world where convenience and sustainability coexist harmoniously.</p>
                        </div>
                        <div className="vm-card">
                            <FiTarget size={50} color="#ff1515" aria-hidden="true" />
                            <h3>Our Mission</h3>
                            <p>We provide eco-friendly disposable solutions while promoting sustainable practices.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="about-section certifications">
                <div className="container">
                    <h2 className="section-title">Our Accreditations</h2>
                    <div className="cert-grid">
                        {certifications.map((cert, idx) => (
                            <CertificationCard key={`cert-${idx}`} cert={cert} />
                        ))}
                    </div>
                    <br />
                    <a href="/certifications" className="btn">
                        View All Our Certifications
                    </a>
                </div>
            </section>

            <BackToTop />
        </>
    );
};

export default AboutUs;
