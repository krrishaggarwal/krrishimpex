// Infrastructure.jsx
import React from "react";
import "../styles/Infrastructure.css";
import BackToTop from "../Components/BackToTop";

import { MdFactory } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

import mf1 from "../assets/Infrastructure/mf1.jpg";
import mf2 from "../assets/Infrastructure/mf2.jpg";
import mf3 from "../assets/Infrastructure/mf3.jpg";
import mf4 from "../assets/Infrastructure/mf4.jpeg";

import wh1 from "../assets/Infrastructure/wh1.jpg";
import wh2 from "../assets/Infrastructure/wh2.jpg";
import wh3 from "../assets/Infrastructure/wh3.jpeg";
import wh4 from "../assets/Infrastructure/wh4.jpg";
import wh5 from "../assets/Infrastructure/wh5.jpeg"

import staff from "../assets/Infrastructure/staff.jpeg";

import factorymaindoor from "../assets/Infrastructure/factorymaindoor.jpg";

import office from "../assets/Infrastructure/office.jpg";
import officegate from "../assets/Infrastructure/officegate.png";

import productwall from "../assets/Infrastructure/productwall.jpg";


// Instead of repeating items, define them in an array:
const galleryData = [
    { src: factorymaindoor, caption: "Factory Entrance" },
    { src: office, caption: "Office" },
    { src: officegate, caption: "Office Entrance" },
    { src: productwall, caption: "Product Wall" },
    { src: staff, caption: "Staff"},
    { src: mf1, caption: "Production Unit" },
    { src: mf2, caption: "Production Unit" },
    { src: mf3, caption: "Production Unit" },
    { src: mf4, caption: "Production Unit" },
    { src: wh1, caption: "WareHouse" },
    { src: wh2, caption: "WareHouse" },
    { src: wh3, caption: "WareHouse" },
    { src: wh4, caption: "WareHouse" },
    { src: wh5, caption: "WareHouse" },
];


const Infrastructure = () => {
    return (
        <>
            {/* Overview Section */}
            <section className="infra-section">
                <div className="container">
                    <h1 className="section-title">Our Manufacturing Facility</h1>
                    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                        <p>
                            Spread across 30,000 square feet in New Delhi, our manufacturing
                            facility is equipped with the latest technology and machinery to
                            produce high-quality products efficiently and sustainably.
                        </p>
                        <p>
                            Our infrastructure is designed to optimize every stage of
                            production, from raw material processing to final packaging,
                            ensuring consistent quality and timely delivery to our clients
                            worldwide.
                        </p>
                        <p>
                            We continuously invest in upgrading our facilities to incorporate
                            eco-friendly manufacturing processes and maintain compliance with
                            international quality standards.
                        </p>
                    </div>
                </div>
            </section>

            {/* Production Capacity */}
            <section className="infra-section capacity-section">
                <div className="container">
                    <h2 className="section-title">Our Production Capacity</h2>
                    <div className="capacity-grid">
                        <div className="capacity-item">
                            <MdFactory size={50} />
                            <div className="capacity-number">30,000</div>
                            <p>Square Feet Space</p>
                        </div>
                        <div className="capacity-item">
                            <FaPeopleGroup size={50} />
                            <div className="capacity-number">100+</div>
                            <p>Skilled Workforce</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="infra-section">
                <div className="container">
                    <h2 className="section-title">
                        Our Manufacturing Units / Facility Gallery
                    </h2>
                    <div className="gallery">
                        {galleryData.map((item, index) => (
                            <div className="gallery-item" key={index}>
                                <img src={item.src} alt={item.caption} />
                                <div className="gallery-caption">{item.caption}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <BackToTop />
        </>
    );
};

export default Infrastructure;
