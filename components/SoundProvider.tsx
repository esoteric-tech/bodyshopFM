"use client"

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface SoundContextType {
  playHoverSound: () => void;
  playClickSound: () => void;
}

const SoundContext = createContext<SoundContextType>({
  playHoverSound: () => {},
  playClickSound: () => {},
});

export function useSounds() {
  return useContext(SoundContext);
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  
  const playHoverSound = () => {
    if (audioRef.current && !audioError) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
        setAudioError(true);
      });
    }
  };
  
  const playClickSound = () => {
    try {
      if (!clickSoundRef.current) {
        clickSoundRef.current = new Audio("/click.mp3");
      }
      clickSoundRef.current.volume = 0.7;
      clickSoundRef.current.currentTime = 0;
      clickSoundRef.current.play().catch(() => {
        // Ignore click sound errors
      });
    } catch (error) {
      // Ignore click sound errors
    }
  };
  
  useEffect(() => {
    audioRef.current = new Audio("/hover.mp3");
    audioRef.current.addEventListener("error", (e) => {
      console.error("Audio error:", e);
      setAudioError(true);
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("error", () => {});
      }
    };
  }, []);
  
  return (
    <SoundContext.Provider value={{ playHoverSound, playClickSound }}>
      {children}
    </SoundContext.Provider>
  );
} 