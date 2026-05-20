import React, { useState, useEffect } from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import "../styles/BackToTop.css";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling 300px
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? "active" : ""}`}
      onClick={scrollToTop}
    >
      <FaArrowAltCircleUp />
    </button>
  );
};

export default BackToTop;
