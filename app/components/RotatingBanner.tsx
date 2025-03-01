"use client"

import { useState, useEffect } from 'react';

export default function RotatingBanner() {
  const phrases = ["Start your engines", "Racers ready", "Go"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-black py-4 text-center">
      <h2 className="text-white text-2xl md:text-3xl font-bold animate-fade-in-out">
        {phrases[currentPhraseIndex]}
      </h2>
    </div>
  );
} 