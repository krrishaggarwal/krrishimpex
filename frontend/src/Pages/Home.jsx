import React from "react";
import BackToTop from "../Components/BackToTop";
import "../styles/Home.css";

import { FaLeaf } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { FaScrewdriverWrench } from "react-icons/fa6";

import about_us from "../assets/home/about.png";
import brand_story from "../assets/home/brandstory.png";

import paper_products from "../assets/home/paper_products.png";
import wooden_products from "../assets/home/wooden_products.png";
import plastic_products from "../assets/home/plastic_products.png";
import other_products from "../assets/home/other_products.png";

import paper_plates from "../assets/home/paper_plates.png";
import cups from "../assets/home/cups.png";
import foil from "../assets/home/foil.png";
import tissue from "../assets/home/tissue.png";
import straws from "../assets/home/straws.png";
import wooden_spoon from "../assets/home/wooden spoon.png";

const testimonialsData = [
  {
    id: 1,
    name: "Mahesh Naagdev",
    role: "Customer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocIvNZJGvRgCCeMUPmCwrb4t7mUFJZqdpvJqTgvEoYgZ7mCXPA=w108-h108-p-rp-mo-br100",
    text: "Excellent Fast service",
  },
  {
    id: 2,
    name: "Naitik Aggarwal",
    role: "Customer",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjWJU3JxJ-F0bIQMRIV3j0busnbZH7T04tKP-TXbt9Ptym7pQPA=w108-h108-p-rp-mo-br100",
    text: "Best service and experience I ever had",
  },
  {
    id: 3,
    name: "Heena Diwakar",
    role: "Customer",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVjuW1kt1zOfM7Znz5SHw-eQh8SQKoG_IUsqrmVHyBqkW8o3_5Y=w108-h108-p-rp-mo-br100",
    text: "My experience was very good with krrish impex. Their products are quality wise superior... And price is also reasonable.",
  },
  {
    id: 4,
    name: "Pradeep Kumar",
    role: "Customer",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjUDoG5p-6UH3xGUbcQHYiRZ53HNZ8lIuLsdgyqbQHJ6u7-CH6un=w108-h108-p-rp-mo-ba2-br100",
    text: "Very nice service with nice product quality",
  },
  {
    id: 5,
    name: "Rahul Prajapati",
    role: "Customer",
    avatar: "https://lh3.googleusercontent.com/a-/ALV-UjVo8oNoKyEZHUeSI1cg42g-Ba0poj9MamZKSnL4x-PbemrD2ZIR=w108-h108-p-rp-mo-br100",
    text: "Excellent service and good deal with owner and cooperative staff everyone do work this company. Best rate all items",
  },
  {
    id: 6,
    name: "Jasveer 780 780",
    role: "Customer",
    avatar: "https://lh3.googleusercontent.com/a/ACg8ocJ6vcTOvoClQEbp7BSJ3EcUMQpxWuYRpXeplHJHwaiKcpqWWg=w108-h108-p-rp-mo-br100",
    text: "The products of Krish Impax industry are of the best quality. I do not like to buy products from anyone else other than them.",
  },
];

const productCategories = [
  {
    id: 1,
    image: paper_products,
    title: "Paper Products",
    description: "Eco-friendly paper disposables for sustainable dining solutions, including plates, cups, and napkins.",
    alt: "Paper Products",
  },
  {
    id: 2,
    image: plastic_products,
    title: "Plastic Products",
    description: "Durable and hygienic plastic disposables for food service, perfect for various serving needs.",
    alt: "Plastic Products",
  },
  {
    id: 3,
    image: wooden_products,
    title: "Wooden Products",
    description: "Premium biodegradable wooden cutlery and servingware for an elegant yet eco-conscious presentation.",
    alt: "Wooden Products",
  },
  {
    id: 4,
    image: other_products,
    title: "Other Products",
    description: "Unique disposable solutions for specific requirements, including aluminum foil, food wraps, and more.",
    alt: "Other Products",
  },
];

const primeProducts = [
  { id: 1, image: paper_plates, title: "Paper Plates", alt: "Paper Plate" },
  { id: 2, image: cups, title: "Paper Cups", alt: "Paper Cups" },
  { id: 3, image: foil, title: "Aluminium Foil Roll", alt: "Aluminium Foil" },
  { id: 4, image: straws, title: "Paper & Plastic Straws", alt: "Straws" },
  { id: 5, image: tissue, title: "Tissues", alt: "Tissue" },
  { id: 6, image: wooden_spoon, title: "Wooden Spoon, Fork & Knives", alt: "Wooden Cutlery" },
];

const qualityFeatures = [
  {
    id: 1,
    icon: FaLeaf,
    title: "Sustainable Sourcing",
    description: "We source only the finest eco-friendly materials from trusted suppliers, ensuring minimal environmental impact.",
  },
  {
    id: 2,
    icon: TbCertificate,
    title: "Certifications",
    description: "We are ISO 9001:2015, UDYAM and MSME Certified, meeting international quality standards.",
  },
  {
    id: 3,
    icon: FaScrewdriverWrench,
    title: "Expert Craftsmanship",
    description: "Our skilled team brings decades of experience in disposable products manufacturing, ensuring precision and reliability.",
  },
];

// Component for testimonials auto-scroll
const Testimonials = () => {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 40px" }}>
          Hear from our valued customers who trust us for their disposable needs.
        </p>

        <div className="scrolling-cards-container">
          <div className="scrolling-cards">
            {testimonialsData.concat(testimonialsData).map((testimonial, idx) => (
              <div key={`${testimonial.id}-${idx}`} className="testimonial-card">
                <div className="testimonial-header">
                  {/* <img
                    src={testimonial.avatar}
                    alt={`${testimonial.name} avatar`}
                    className="testimonial-avatar"
                  /> */}
                  <div>
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-text">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <div className="home-page">
      {/* Banner */}
      <section className="banner" id="home">
        <div className="container">
          <h1>A Trusted Brand In Disposable Industry</h1>
          <p>
            Our house-hold disposable cutlery & tableware combines eco-friendly materials with sleek designs,
            perfect for any occasion. Say goodbye to single-use plastics and hello to
            a greener future with our compostable utensils.
          </p>
          <a href="/products" className="btn">
            Explore Our Products
          </a>
        </div>
      </section>

      {/* About Us */}
      <section className="about" id="about">
        <div className="container">
          <h2 className="section-title">About Us</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                <strong>Established in 2001</strong>
                <br />
                We are manufacturers, importers, exporters and traders of all kinds of
                house-hold disposable cutlery & tableware. As a registered brand, we are committed to providing
                eco-friendly solutions for food service needs.
                <br />
                Founded on the principles of sustainability and innovation, we specialize
                in manufacturing and distributing high-quality disposable plates and
                utensils made from biodegradable materials.
                <br />
                Our mission is to offer convenient, hygienic, and environmentally
                responsible alternatives to traditional single-use plastics,
                contributing to a greener planet while never compromising on quality or
                performance.
              </p>
              <br />
              <a href="/about" className="btn">
                Learn More About Us
              </a>
            </div>
            <div className="about-image">
              <img src={about_us} alt="About Krrish Impex" />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="about" id="brand-story">
        <div className="container">
          <h2 className="section-title">Brand Story</h2>
          <div className="about-content">
            <div className="about-image">
              <img src={brand_story} alt="Krrish Impex Brand Story" />
            </div>
            <div className="about-text">
              <p>
                At Krrish Ecoware Industries PVT. LTD. {`(Krrish Impex)`}, we embarked on a journey fueled by a simple yet powerful
                idea: to revolutionize the way people experience convenience and
                sustainability in their daily lives. Founded in 2001, our humble
                beginnings sprouted from a shared passion for innovation and a commitment
                to making a positive impact on the world around us.
              <br />
                Driven by our mission to provide high-quality disposable utensils that
                blend convenience with environmental responsibility, we set out to
                redefine the norms of modern dining. From backyard barbecues to elegant
                events, our products seamlessly integrate into any occasion, offering
                unparalleled ease without compromising on sustainability.
             <br />
                Today, with over two decades of experience, we've grown to become a
                trusted name in the industry, serving customers across India and beyond.
                Our journey continues as we explore new materials, technologies, and
                designs to better serve our customers and our planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="quality" id="quality">
        <div className="container">
          <h2 className="section-title">Our Quality Promise</h2>
          <p>
            At Krrish Ecoware Industries PVT. LTD., quality isn't just a standard—it's our promise to you. From
            sourcing sustainable materials to rigorous quality control checks, we uphold
            the highest standards of excellence at every step of our production process.
          </p>

          <div className="quality-cards">
            {qualityFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div key={feature.id} className="quality-card">
                  <IconComponent />
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="categories" id="products">
        <div className="container">
          <h2 className="section-title">Our Product Categories</h2>
          <div className="category-grid">
            {productCategories.map((category) => (
              <div key={category.id} className="category-card">
                <img src={category.image} alt={category.alt} />
                <div className="category-info">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="category-action">
            <a href="/products" className="btn">
              Explore Products
            </a>
          </div>
        </div>
      </section>

      {/* Prime Choices */}
      <section className="prime-choices" id="prime-choices">
        <div className="container">
          <h2 className="section-title">Our Prime Choices</h2>
          <p style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 40px" }}>
            Discover our most popular products that combine style, functionality, and
            eco-consciousness. Each item is carefully designed to meet the highest
            standards of quality and sustainability.
          </p>

          <div className="scrolling-cards-container">
            <div className="scrolling-cards">
              {primeProducts.concat(primeProducts).map((product, idx) => (
                <div key={`${product.id}-${idx}`} className="product-card">
                  <img src={product.image} alt={product.alt} />
                  <div className="product-info">
                    <h3>{product.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews */}
      <Testimonials />

      {/* Call To Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-container">
            <h2>Ready to Switch to Eco-Friendly Disposables?</h2>
            <p>
              Join thousands of businesses that have made the switch to sustainable
              disposable solutions. Contact us today to discuss your requirements and
              get a customized quote for your business needs.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="btn">
                Contact Us
              </a>
              <a href="/products" className="btn btn-outline">
                Browse Products
              </a>
            </div>
          </div>
        </div>
      </section>
      <BackToTop />
    </div>
  );
};

export default Home;
