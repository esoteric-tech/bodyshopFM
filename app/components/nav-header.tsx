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
    <div className="border-b border-[#E6B800] fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center justify-end bg-[#E6B800] p-2">
        {/* NavHeader is now empty as content has been moved to main page */}
      </div>
    </div>
  )
}

