"use client"

import type React from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"

interface AudioContextType {
  isMuted: boolean
  toggleMute: () => void
  isPlaying: boolean
  startPlaying: () => void
}

const AudioContext = createContext<AudioContextType>({
  isMuted: false,
  toggleMute: () => {},
  isPlaying: false,
  startPlaying: () => {},
})

export function useAudio() {
  return useContext(AudioContext)
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [autoplayFailed, setAutoplayFailed] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContext = useRef<AudioContext | null>(null)

  // Initialize audio and attempt to play
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Make sure we're using the correct audio file path
        const audioFile = "/seemingly.mp3";
        console.log("Attempting to load audio from:", audioFile);
        
        // Create audio element
        audioRef.current = new Audio(audioFile);
        audioRef.current.loop = true;
        
        // Add basic event listeners
        audioRef.current.addEventListener("error", (e) => {
          console.error("Audio file error:", e);
          setAudioError(true);
        });
        
        audioRef.current.addEventListener("playing", () => {
          console.log("Audio is now playing");
          setIsPlaying(true);
        });
        
        audioRef.current.addEventListener("pause", () => {
          console.log("Audio paused");
          setIsPlaying(false);
        });
        
        // Basic play attempt
        const playAudio = () => {
          if (!audioRef.current) return;
          
          console.log("Attempting to play audio...");
          audioRef.current.play()
            .then(() => {
              console.log("Audio playback started successfully");
              setIsPlaying(true);
            })
            .catch(err => {
              console.error("Failed to play audio:", err);
              
              // Fall back to muted playback if regular playback fails
              if (audioRef.current) {
                console.log("Trying muted playback...");
                audioRef.current.muted = true;
                setIsMuted(true);
                
                audioRef.current.play()
                  .then(() => {
                    console.log("Muted playback succeeded");
                    setIsPlaying(true);
                  })
                  .catch(err => {
                    console.error("Even muted playback failed:", err);
                    setAutoplayFailed(true);
                  });
              }
            });
        };
        
        // Check if audio file can be loaded
        audioRef.current.addEventListener("canplaythrough", () => {
          console.log("Audio can play through, attempting playback");
          playAudio();
        });
        
        // Handle any user interaction to initiate playback
        const handleUserInteraction = () => {
          console.log("User interaction detected");
          if (audioRef.current) {
            audioRef.current.muted = false;
            setIsMuted(false);
            playAudio();
          }
        };
        
        document.addEventListener("click", handleUserInteraction, { once: true });
        
        return () => {
          document.removeEventListener("click", handleUserInteraction);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
          }
        };
      } catch (error) {
        console.error("Audio initialization error:", error);
        setAudioError(true);
      }
    }
  }, []);

  const startPlaying = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setAutoplayFailed(false)
        })
        .catch(error => {
          console.error("Manual play failed:", error)
          setAutoplayFailed(true)
        })
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, isPlaying, startPlaying }}>
      {children}
      {audioError && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded shadow-lg z-50">
          Error: Audio file not found. Please add the "seemingly.mp3" file to your public folder.
        </div>
      )}
    </AudioContext.Provider>
  )
}

