"use client"

import Link from "next/link"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAudio } from "@/app/components/audio-player"

interface NavHeaderProps {
  currentPage: "home" | "characters"
  onHover: () => void
}

export function NavHeader({ currentPage, onHover }: NavHeaderProps) {
  const { isMuted, toggleMute, isPlaying, startPlaying } = useAudio()

  return (
    <div className="border-b border-black">
      <div className="flex items-center justify-between bg-[#B3DAFF] p-2">
        <div className="flex items-center">
          <Link href="/">
            <Button
              variant="ghost"
              className="mr-4 text-xl font-bold transition-colors duration-150 text-white"
              onMouseEnter={onHover}
            >
              {currentPage === "home" ? "Chain City" : "Home"}
            </Button>
          </Link>
          <div className="h-8 w-[2px] bg-black mx-2" />
          <Link href="/characters">
            <Button
              variant="ghost"
              className="text-xl font-bold transition-colors duration-150 text-white"
              onMouseEnter={onHover}
            >
              Characters
            </Button>
          </Link>
        </div>
        <div className="flex items-center bg-black text-white px-4 py-2 min-w-[48px] md:min-w-[300px] max-w-[50%] flex-grow">
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
    </div>
  )
}

