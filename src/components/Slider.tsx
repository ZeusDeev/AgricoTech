import React, { useState, useEffect } from "react";
import "../styles/AppStyles.css";

const Slider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [0, 1, 2]; // Representa la cantidad de imágenes

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const newIndex = Math.min(images.length - 1, Math.floor(scrollY / 500));
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="slider">
      <div
        className="slider-container"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((_, index) => (
          <div key={index} className="slider-item"></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
