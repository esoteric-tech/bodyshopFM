"use client"

import { useState, useEffect } from 'react';

export default function AnimatedBanner() {
  const phrases = ["START YOUR ENGINES", "RACERS READY", "GO"];
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="w-full bg-black py-4">
      <div className="container mx-auto px-4">
        <h2 
          className="text-white text-3xl md:text-4xl font-bold text-center animated-banner-text"
          key={currentIndex}
        >
          {phrases[currentIndex]}
        </h2>
      </div>
    </div>
  );
} 