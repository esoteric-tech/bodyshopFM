"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { NavHeader } from "./components/nav-header"
import { ImageCarousel } from "@/components/ImageCarousel"
import SplineModel from "@/components/SplineModel"
import Image from 'next/image'
import { Footer } from "@/components/Footer"
import { Volume2, VolumeX } from "lucide-react"
import { useAudio } from "@/app/components/audio-player"

export default function Home() {
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const { isMuted, toggleMute, isPlaying, startPlaying } = useAudio()

  const playHoverSound = () => {
    if (audioRef.current && !audioError) {
      // Reset the audio to the beginning
      audioRef.current.currentTime = 0
      
      // Play the sound with better error handling
      const playPromise = audioRef.current.play()
      
      // Handle the play promise (required for modern browsers)
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback started successfully
          })
          .catch((error) => {
            // Auto-play was prevented or there was another error
            console.error("Error playing hover sound:", error)
            
            // Don't set audioError to true on the first failure
            // This allows retry on subsequent hovers after user interaction
            if (error.name !== 'NotAllowedError') {
              setAudioError(true)
            }
          })
      }
    }
  }

  const playClickSound = () => {
    try {
      if (!clickSoundRef.current) {
        clickSoundRef.current = new Audio("/click.mp3")
        clickSoundRef.current.preload = "auto"
        clickSoundRef.current.load()
      }
      
      // Set volume
      clickSoundRef.current.volume = 0.7
      clickSoundRef.current.currentTime = 0
      
      // Play with proper promise handling
      const playPromise = clickSoundRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Just log the error but don't show to user
          console.error("Error playing click sound:", error)
        })
      }
    } catch (error) {
      // Ignore click sound errors
      console.error("Click sound error:", error)
    }
  }

  useEffect(() => {
    // Preload the audio files
    audioRef.current = new Audio("/hover.mp3")
    audioRef.current.preload = "auto"
    audioRef.current.load()
    
    // Also preload the click sound
    clickSoundRef.current = new Audio("/click.mp3")
    clickSoundRef.current.preload = "auto"
    clickSoundRef.current.load()
    
    // Add error handling
    audioRef.current.addEventListener("error", (e) => {
      console.error("Audio error:", e)
      setAudioError(true)
    })
    
    // Enable audio after first user interaction (needed for browsers that block autoplay)
    const enableAudio = () => {
      if (audioRef.current) {
        // Play and immediately pause to "unlock" audio
        audioRef.current.play().then(() => {
          audioRef.current?.pause()
          audioRef.current!.currentTime = 0
        }).catch(err => console.log("Could not enable audio:", err))
      }
      
      // Remove the listener after first interaction
      document.removeEventListener('click', enableAudio)
      document.removeEventListener('touchstart', enableAudio)
      document.removeEventListener('keydown', enableAudio)
    }
    
    // Add listeners for user interaction
    document.addEventListener('click', enableAudio)
    document.addEventListener('touchstart', enableAudio)
    document.addEventListener('keydown', enableAudio)
    
    return () => {
      // Clean up all event listeners
      document.removeEventListener('click', enableAudio)
      document.removeEventListener('touchstart', enableAudio)
      document.removeEventListener('keydown', enableAudio)
      
      if (audioRef.current) {
        audioRef.current.removeEventListener("error", () => {})
      }
    }
  }, [])

  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chromuh_httpss.mj.runy9pSwWzUJno_racer_girl_like_suki_2_fast__0b0aeda4-c98a-423b-a0c3-a908a9e13f03_2-tWRQwa5goK108lfADwLcRfXVUijCJ9.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chromuh_httpss.mj.run6hvFekT0clI_A_lean_long_cornrows_black_m_28627843-f59b-4669-af5e-ad9ac31aad8e_3-itm2C8yoB9PyTJisodVHKXyCdGUYcr.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chromuh_A_lean_long_haired_black_female_race_car_driver._Anime__8501aa74-2dae-40a3-a993-b5cce4884a85.png-RkZsIf80aiqSTSSTzm1LITwPGtyTun.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chromuh_httpss.mj.runy9pSwWzUJno_racer_girl_like_suki_2_fast_2__f1c722e3-4cd3-45e7-a2a9-a6ad307b0fa5%20%281%29.png-GPBxCIs2IL5rAcwK1kMm9l4gYMYFDS.jpeg",
  ]

  return (
    <div className="min-h-screen bg-[#E6B800] text-white overscroll-none">
      <div className="container mx-auto p-4">
        {/* Empty NavHeader for spacing */}
        <div className="h-8"></div>

        {/* Folder Tabs and Music Player Row */}
        <div className="flex justify-between items-center mb-[-1px] fade-in" style={{ animationDelay: '1.2s' }}>
          {/* Folder Tabs */}
          <div className="relative z-10 flex justify-start ml-4">
            <a 
              href="#" 
              className="folder-tab mr-2"
              onClick={(e) => {
                e.preventDefault();
                playClickSound();
              }}
              onMouseEnter={playHoverSound}
            >
              Chain City
            </a>
            <a 
              href="#" 
              className="folder-tab"
              onClick={(e) => {
                e.preventDefault();
                playClickSound();
              }}
              onMouseEnter={playHoverSound}
            >
              Character
            </a>
          </div>
          
          {/* Music Player */}
          <div className="flex items-center bg-black text-white px-4 py-2 min-w-[48px] md:min-w-[300px] max-w-[50%] mr-4 z-10">
            <div className="flex-1 overflow-hidden hidden md:block">
              <div className="animate-marquee whitespace-nowrap">
                <span className="mr-4">NOW PLAYING</span>
                <span>Reon Vanger - Seemingly</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleMute} 
                className="flex-shrink-0 focus:outline-none cursor-pointer"
                title={isMuted ? "Unmute" : "Mute"}
                onMouseEnter={playHoverSound}
              >
                {isMuted ? (
                  <VolumeX className="w-6 h-6 transition-all duration-300 ease-in-out" />
                ) : (
                  <Volume2 className="w-6 h-6 transition-all duration-300 ease-in-out" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-4 racing-border">
          <div className="md:col-span-2 p-4 flex flex-col justify-center relative">
            <div className="vertical-border"></div>
            {/* Logo container with left alignment */}
            <div className="flex items-start justify-start mb-8 pl-4 fade-in" style={{ animationDelay: '1.5s' }}>
              <Image 
                src="/bodyshoplogo.png" 
                alt="Bodyshop Logo" 
                width={400}
                height={219}
                priority
                className="object-contain w-auto max-h-full ml-4"
              />
            </div>

            {/* Welcome Text */}
            <div className="text-xl md:text-2xl lg:text-3xl font-medium pl-8 pr-32 text-white fade-in" style={{ animationDelay: '1.8s' }}>
              <p>Official Broadcaster to the Onchain Racing Scene. <strong><em>BodyshopFM</em></strong>. The only station you should be playing while on the grid.</p>
            </div>
            
            {/* Footer Links */}
            <div className="mt-8 fade-in" style={{ animationDelay: '2.1s' }}>
              <div className="flex gap-4 pl-8">
                {/* Twitter link */}
                <a 
                  href="https://x.com/bodyshopfm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className="text-xl font-bold text-white hover:underline"
                >
                  Twitter
                </a>
                
                {/* Telegram link */}
                <a 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    playClickSound();
                  }}
                  onMouseEnter={playHoverSound}
                  className="text-xl font-bold text-white hover:underline cursor-pointer"
                >
                  Telegram
                </a>
                
                {/* Zora link */}
                <a 
                  href="https://zora.co/@bodyshopfm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  onMouseEnter={playHoverSound}
                  className="text-xl font-bold text-white hover:underline"
                >
                  Zora
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 flex flex-col relative">
            {/* Right-hand side border */}
            <div className="absolute top-0 right-0 h-full w-[2px] bg-white opacity-0 animate-fadeIn" style={{ animationDelay: '3.3s', animationFillMode: 'forwards' }}></div>
            
            {/* Simplified Image Viewer Banner */}
            <div className="win95-window-header fade-in" style={{ animationDelay: '2.2s' }}>
              <div className="win95-title-bar">
                <div className="win95-title-text">imageviewer.exe</div>
                <div className="win95-window-controls">
                  <button className="win95-window-button">×</button>
                </div>
              </div>
            </div>
            <div className="h-[600px] fade-in relative z-1 win95-window-content" style={{ animationDelay: '2.4s' }}>
              <ImageCarousel images={images} onHover={playHoverSound} onClick={playClickSound} />
            </div>
            {/* Separator Line */}
            <div className="h-[2px] separator-line"></div>
            {/* 3D Model */}
            <div className="fade-in relative z-1" style={{ animationDelay: '3.0s' }}>
              <SplineModel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

