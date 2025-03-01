"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";

// Add proper props interface
interface FooterProps {
  playHoverSound?: () => void;
  playClickSound?: () => void;
}

export function Footer({ playHoverSound, playClickSound }: FooterProps) {
  // Local sound state and refs
  const [audioError, setAudioError] = useState(false);
  const hoverSoundRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio elements
  useEffect(() => {
    // Create hover sound
    hoverSoundRef.current = new Audio("/hover.mp3");
    hoverSoundRef.current.volume = 0.5;
    hoverSoundRef.current.load();
    
    // Create click sound
    clickSoundRef.current = new Audio("/click.mp3");
    clickSoundRef.current.volume = 0.7;
    clickSoundRef.current.load();
    
    // Error handling
    const handleError = (e: any) => {
      console.error("Audio error:", e);
      setAudioError(true);
    };
    
    hoverSoundRef.current.addEventListener("error", handleError);
    clickSoundRef.current.addEventListener("error", handleError);
    
    return () => {
      if (hoverSoundRef.current) {
        hoverSoundRef.current.removeEventListener("error", handleError);
      }
      if (clickSoundRef.current) {
        clickSoundRef.current.removeEventListener("error", handleError);
      }
    };
  }, []);
  
  // Sound playing functions
  const handleHoverSound = () => {
    if (playHoverSound) {
      playHoverSound();
    } else if (hoverSoundRef.current && !audioError) {
      // Create a clone for overlapping sounds
      const sound = hoverSoundRef.current.cloneNode() as HTMLAudioElement;
      sound.volume = 0.5;
      sound.play().catch(err => console.log("Hover sound error:", err));
    }
  };
  
  const handleClickSound = () => {
    if (playClickSound) {
      playClickSound();
    } else if (clickSoundRef.current && !audioError) {
      // Create a clone for overlapping sounds
      const sound = clickSoundRef.current.cloneNode() as HTMLAudioElement;
      sound.volume = 0.7;
      sound.play().catch(err => console.log("Click sound error:", err));
    }
  };

  return (
    <div className="mt-4 flex justify-between px-4">
      {/* Twitter link */}
      <a 
        href="https://x.com/bodyshopfm" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleClickSound}
      >
        <Button
          variant="ghost"
          className="text-xl font-bold hover:translate-y-[-2px] transition-all duration-100 rounded-none text-white"
          onMouseEnter={handleHoverSound}
        >
          Twitter
        </Button>
      </a>
      
      {/* Telegram button */}
      <Button
        variant="ghost"
        className="text-xl font-bold hover:translate-y-[-2px] transition-all duration-100 rounded-none text-white"
        onMouseEnter={handleHoverSound}
        onClick={handleClickSound}
      >
        Telegram
      </Button>
      
      {/* Zora link */}
      <a 
        href="https://zora.co/@bodyshopfm" 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={handleClickSound}
      >
        <Button
          variant="ghost"
          className="text-xl font-bold hover:translate-y-[-2px] transition-all duration-100 rounded-none text-white"
          onMouseEnter={handleHoverSound}
        >
          Zora
        </Button>
      </a>
    </div>
  );
} 