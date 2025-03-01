"use client"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { NavHeader } from "./components/nav-header"
import { ImageCarousel } from "@/components/ImageCarousel"
import SplineModel from "@/components/SplineModel"
import Image from 'next/image'
import { Footer } from "@/components/Footer"
import AnimatedBanner from '@/app/components/AnimatedBanner'

export default function Home() {
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)

  const playHoverSound = () => {
    if (audioRef.current && !audioError) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
        setAudioError(true)
      })
    }
  }

  const playClickSound = () => {
    try {
      if (!clickSoundRef.current) {
        clickSoundRef.current = new Audio("/click.mp3")
      }
      clickSoundRef.current.volume = 0.7
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch(() => {
        // Ignore click sound errors
      })
    } catch (error) {
      // Ignore click sound errors
    }
  }

  useEffect(() => {
    audioRef.current = new Audio("/hover.mp3")
    audioRef.current.addEventListener("error", (e) => {
      console.error("Audio error:", e)
      setAudioError(true)
    })
    
    return () => {
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
    <div className="min-h-screen bg-[#B3DAFF] text-white overscroll-none">
      <div className="container mx-auto p-4">
        <NavHeader currentPage="home" onHover={playHoverSound} />

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 border border-black p-4">
          <div className="md:col-span-2 md:border-r-2 border-black">
            {/* Logo container with left alignment */}
            <div className="h-64 mb-10 flex items-start justify-start">
              <Image 
                src="/bodyshoplogo.png" 
                alt="Bodyshop Logo" 
                width={400}
                height={219}
                priority
                className="object-contain w-auto max-h-full"
              />
            </div>

            {/* Welcome Text */}
            <div className="text-2xl md:text-4xl lg:text-5xl font-medium">
              Official Broadcaster to the Onchain Racing Scene.
              <br />
              <br />
              BodyshopFM. 
              <br /> 
              <br />
              The only station you should be playing while on the grid. 
              <br />
              <br />
              <br />
              
            </div>
            
            {/* Banner directly below welcome text, touching border */}
            <div className="mx-[-16px] mt-6 w-[calc(100%+16px)]"> {/* Negative margin to touch borders */}
              <AnimatedBanner />
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="carousel-container" style={{ height: "500px", position: "relative" }}>
              <ImageCarousel images={images} onHover={playHoverSound} />
            </div>

            {/* Separator Line */}
            <div className="h-[2px] bg-black my-4" />

            {/* 3D Model */}
            <SplineModel />
          </div>
        </div>

        {/* Footer with sound functions */}
        <Footer 
          playHoverSound={playHoverSound} 
          playClickSound={playClickSound} 
        />
      </div>
    </div>
  )
}

