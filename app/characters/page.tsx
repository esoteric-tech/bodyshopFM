"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import SplineModel from "@/components/SplineModel"
import { useAudio } from "@/app/components/audio-player"
import { Footer } from "@/components/Footer"

interface Character {
  id: number
  name: string
  image: string
  description: string
}

const characters: Character[] = [
  {
    id: 1,
    name: "Mei",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chromuh_httpss.mj.runy9pSwWzUJno_racer_girl_like_suki_2_fast__0b0aeda4-c98a-423b-a0c3-a908a9e13f03_2-tWRQwa5goK108lfADwLcRfXVUijCJ9.png",
    description:
      "A technical driving prodigy whose precision and skill behind the wheel are unmatched. Her deep understanding of vehicle mechanics and racing theory makes her a formidable opponent on any track.",
  },
  {
    id: 2,
    name: "Marcus",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chromuh_httpss.mj.run6hvFekT0clI_A_lean_long_cornrows_black_m_28627843-f59b-4669-af5e-ad9ac31aad8e_3-itm2C8yoB9PyTJisodVHKXyCdGUYcr.png",
    description:
      "The reigning champion of Solana's street racing circuit. His innovative driving techniques and fearless approach to racing have earned him legendary status among both fans and competitors.",
  },
  {
    id: 3,
    name: "Luna",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chromuh_A_lean_long_haired_black_female_race_car_driver._Anime__8501aa74-2dae-40a3-a993-b5cce4884a85.png-RkZsIf80aiqSTSSTzm1LITwPGtyTun.jpeg",
    description:
      "Rising star of the underground racing scene, known for her bold strategies and adaptability. Her signature pink racing suit has become a symbol of her growing influence in the racing world.",
  },
  {
    id: 4,
    name: "Yuki",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chromuh_httpss.mj.runy9pSwWzUJno_racer_girl_like_suki_2_fast_2__f1c722e3-4cd3-45e7-a2a9-a6ad307b0fa5%20%281%29.png-GPBxCIs2IL5rAcwK1kMm9l4gYMYFDS.jpeg",
    description:
      "A mysterious veteran of the racing world whose tactical genius is legendary. Her calculated approach and deep understanding of racing psychology gives her an edge in high-stakes competitions.",
  },
]

export default function CharactersPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [audioError, setAudioError] = useState(false)
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const clickSoundRef = useRef<HTMLAudioElement | null>(null)
  const { isMuted, toggleMute, isPlaying, startPlaying } = useAudio()

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
              <Link href="/">
                <Button
                  variant="ghost"
                  className="mr-4 text-xl font-bold hover:translate-y-[-2px] transition-all duration-100 rounded-none text-white"
                  onMouseEnter={playHoverSound}
                >
                  Home
                </Button>
              </Link>
              <div className="h-8 w-[2px] bg-black mx-2" />
              <Button
                variant="ghost"
                className="text-xl font-bold hover:translate-y-[-2px] transition-all duration-100 rounded-none text-white"
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
              <div className="flex items-center gap-2">
                <button 
                  onClick={toggleMute} 
                  className="flex-shrink-0 focus:outline-none"
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

        {/* Main Content - Modified to span full width */}
        <div className="mt-4 border border-black p-4">
          {/* Characters Grid - Spans full width now */}
          <div className="flex flex-col md:flex-row gap-4 h-full">
            {characters.map((character) => (
              <div
                key={character.id}
                className="relative w-full md:w-1/4 h-[600px] md:h-[700px] cursor-pointer group"
                onClick={() => {
                  setSelectedCharacter(character)
                  playClickSound()
                }}
                onMouseEnter={playHoverSound}
              >
                <Image
                  src={character.image || "/placeholder.svg"}
                  alt={character.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl font-bold text-white">{character.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Replace your current footer with the reusable component */}
        <Footer 
          playHoverSound={playHoverSound} 
          playClickSound={playClickSound} 
        />
      </div>

      {/* Character Modal */}
      <Dialog open={!!selectedCharacter} onOpenChange={() => setSelectedCharacter(null)}>
        <DialogContent className="bg-[#B3DAFF] border-black text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedCharacter?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative aspect-[2/3]">
              {selectedCharacter && (
                <Image
                  src={selectedCharacter.image || "/placeholder.svg"}
                  alt={selectedCharacter.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg">{selectedCharacter?.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

