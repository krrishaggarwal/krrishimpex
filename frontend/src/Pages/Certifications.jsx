import React from "react";
import BackToTop from "../Components/BackToTop";

// Import certificate images
import iso from "../assets/Certificates/isoc.png";
import gst from "../assets/Certificates/gstreg.png";
import iec from "../assets/Certificates/iec.png";
import customs from "../assets/Certificates/customer_affairs.png";
import trademark from "../assets/Certificates/trademark.png";
import indiamart from "../assets/Certificates/indiamart.png";
import iso2 from "../assets/Certificates/isoc2.png";
import msme from "../assets/Certificates/MSME.png";
import udyam from "../assets/Certificates/udyam.png";
import tradeindia from "../assets/Certificates/tradeindia.png";
import JustDial from "../assets/Certificates/justDial.jpeg";
import gtl from "../assets/Certificates/GTL.png";
import lmpc from "../assets/Certificates/Lmpc.png";

import "../styles/Certifications.css";

const Certification = () => {
    return (
        <>
            {/* Certificates Section */}
            <section className="certificates-section certificates">
                <div className="container">
                    <h1 className="section-title">Our Certifications</h1>
                    <div className="cert-grid">

                        {/* ISO 9001 */}
                        <div className="cert-card">
                            <img src={iso} alt="ISO 9001:2015 Certification" loading="lazy" />
                            <h3>ISO 9001:2015 Certified</h3>
                            <p>
                                Our Quality Management System is certified to meet international standards,
                                ensuring consistent quality in all our products and processes.
                            </p>
                        </div>

                        {/* ISO 14001 */}
                        <div className="cert-card">
                            <img src={iso2} alt="ISO 14001:2015 Certification" loading="lazy" />
                            <h3>ISO 14001:2015 Certified</h3>
                            <p>
                                Our Environmental Management System is certified to meet international standards,
                                promoting eco-friendly practices and minimizing environmental impact.
                            </p>
                        </div>

                        {/* GST */}
                        <div className="cert-card">
                            <img src={gst} alt="GST Registration" loading="lazy" />
                            <h3>GST Registered</h3>
                            <p>
                                Registered under the Goods and Services Tax (GST) system of India, ensuring
                                transparent and compliant financial transactions.
                            </p>
                        </div>

                        {/* IEC */}
                        <div className="cert-card">
                            <img src={iec} alt="Import Export Code" loading="lazy" />
                            <h3>Import-Export Code</h3>
                            <p>
                                Authorized by the Directorate General of Foreign Trade to carry out
                                international trade operations seamlessly.
                            </p>
                        </div>

                        {/* Customs */}
                        <div className="cert-card">
                            <img src={customs} alt="Customs Affairs Registration" loading="lazy" />
                            <h3>Customs Affairs Registered</h3>
                            <p>
                                Recognized by Indian Customs Authorities, enabling smooth and efficient
                                import and export clearances.
                            </p>
                        </div>

                        {/* Trademark */}
                        <div className="cert-card">
                            <img src={trademark} alt="Trademark Registration" loading="lazy" />
                            <h3>Trademark Registered</h3>
                            <p>
                                Our brand and products are protected under Indian trademark laws,
                                ensuring authenticity and safeguarding our identity.
                            </p>
                        </div>

                        {/* IndiaMART */}
                        <div className="cert-card">
                            <img src={indiamart} alt="IndiaMART Verified Certificate" loading="lazy" />
                            <h3>IndiaMART Verified</h3>
                            <p>
                                Verified manufacturer and supplier on India's largest B2B marketplace,
                                with a proven record of reliability and trust.
                            </p>
                        </div>

                        {/* TradeIndia */}
                        <div className="cert-card">
                            <img src={tradeindia} alt="TradeIndia Certificate" loading="lazy" />
                            <h3>TradeIndia Verified</h3>
                            <p>
                                Registered and verified member of TradeIndia, connecting us with
                                buyers and businesses across India and overseas.
                            </p>
                        </div>

                        {/* JustDial */}
                        <div className="cert-card">
                            <img src={JustDial} alt="JustDial Certificate" loading="lazy" />
                            <h3>JustDial Verified</h3>
                            <p>
                                Listed and verified on JustDial, strengthening our presence as a trusted
                                manufacturer and supplier in the market.
                            </p>
                        </div>

                        {/* MSME */}
                        <div className="cert-card">
                            <img src={msme} alt="MSME Registration Certificate" loading="lazy" />
                            <h3>MSME Registered</h3>
                            <p>
                                Recognized by the Ministry of Micro, Small & Medium Enterprises,
                                Government of India, supporting growth and innovation.
                            </p>
                        </div>

                        {/* UDYAM */}
                        <div className="cert-card">
                            <img src={udyam} alt="UDYAM Registration Certificate" loading="lazy" />
                            <h3>UDYAM Registered</h3>
                            <p>
                                Registered under the Udyam Registration Portal, reaffirming our status
                                as a recognized MSME in India.
                            </p>
                        </div>

                        {/* GTL */}
                        <div className="cert-card">
                            <img src={gtl} alt="GTL Registration Certificate" loading="lazy" />
                            <h3>GTL Registered</h3>
                            <p>
                                Certified under the GTL Registration program, ensuring compliance with
                                quality and business standards.
                            </p>
                        </div>

                        {/* LMPC */}
                        <div className="cert-card">
                            <img src={lmpc} alt="LMPC Registration Certificate" loading="lazy" />
                            <h3>LMPC Registered</h3>
                            <p>
                                Licensed under the Legal Metrology Packaged Commodities (LMPC) rules,
                                ensuring accuracy and compliance in packaging.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* Quality Assurance Section */}
            <section className="certificates-section quality-section">
                <div className="container">
                    <h2 className="section-title">Our Quality Assurance</h2>
                    <div className="quality-content">
                        <p>
                            At Krrish Ecoware Industries PVT. LTD., quality isn't just a certificate on the wall - it's a
                            fundamental principle that guides every aspect of our operations. Our
                            certifications reflect our long-standing commitment to excellence.
                        </p>
                        <p>
                            We follow strict quality control measures at every stage of production -
                            from raw material sourcing to final packaging. Our dedicated QA team
                            conducts regular inspections and tests to ensure compliance with
                            international standards.
                        </p>
                        <p>
                            Beyond meeting certification requirements, we continuously invest in
                            training, technology, and process improvement to deliver products that
                            exceed customer expectations worldwide.
                        </p>
                    </div>
                </div>
            </section>

            <BackToTop />
        </>
    );
};

export default Certification;
