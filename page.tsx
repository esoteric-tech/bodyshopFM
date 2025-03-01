"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BodyshopFM() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playHoverSound = () => {
    if (audioRef.current && !audioError) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error)
        setAudioError(true)
      })
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
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
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#B3DAFF] text-white">
      <div className="container mx-auto p-4">
        {/* Header Navigation */}
        <div className="border border-black">
          <div className="flex items-center justify-between bg-[#B3DAFF] p-2">
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="mr-4 text-xl font-bold hover:translate-y-[-2px] transition-all duration-100 border-2 border-[#B3DAFF] hover:border-black rounded-none text-white"
                onMouseEnter={playHoverSound}
              >
                Solana City
              </Button>
              <div className="h-8 w-[2px] bg-black mx-2" />
              <Button
                variant="ghost"
                className="text-xl font-bold hover:translate-y-[-2px] transition-all duration-100 border-2 border-[#B3DAFF] hover:border-black rounded-none text-white"
                onMouseEnter={playHoverSound}
              >
                Characters
              </Button>
            </div>
            <div className="flex items-center bg-black text-white px-4 py-2 min-w-[48px] md:min-w-[300px] max-w-[50%] flex-grow">
              <div className="flex-1 overflow-hidden hidden md:block">
                <div className="animate-marquee whitespace-nowrap">
                  <span className="mr-4">NOW PLAYING</span>
                  <span>Hide You - NEEKEETONE</span>
                </div>
              </div>
              <button onClick={toggleMute} className="flex-shrink-0 focus:outline-none">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 border border-black p-4">
          <div className="md:col-span-2 md:border-r-2 border-black">
            {/* Logo Placeholder */}
            <div className="h-32 mb-8">{/* SVG will be added here */}</div>

            {/* Welcome Text */}
            <div className="text-2xl mb-8">
              Welcome to the official website
              <br />
              for Bodyshop FM. Official race
              <br />
              radio and sponsor of the Solana
              <br />
              Downtown Racing
            </div>

            {/* Official CA Banner */}
            <div className="bg-black text-white p-2 overflow-hidden -mx-4 md:mr-0 w-[calc(100%+2rem)] md:w-[calc(100%+1rem)]">
              <div className="animate-marquee whitespace-nowrap">
                OFFICIAL CA: 2Jmz9nhBFA9bHeWtSNANcFn4Mx7w5UlLeRw5vBDJpump OFFICIAL CA:
                2Jmz9nhBFA9bHeWtSNANcFn4Mx7w5UlLeRw5vBDJpump
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            {/* Image Carousel */}
            <div className="relative h-[200px] mb-4">
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt="Carousel image"
                fill
                className="object-cover"
              />
            </div>

            {/* Separator Line */}
            <div className="h-[2px] bg-black my-4" />

            {/* 3D Model Placeholder */}
            <div className="h-[300px] border border-black bg-[#92C5FE]">{/* 3D model will be added here */}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between px-4">
          {["Twitter", "Telegram", "Pump.Fun"].map((link) => (
            <Button
              key={link}
              variant="ghost"
              className="text-xl font-bold hover:translate-y-[-2px] transition-all duration-100 border-2 border-[#B3DAFF] hover:border-black rounded-none text-white"
              onMouseEnter={playHoverSound}
            >
              {link}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

