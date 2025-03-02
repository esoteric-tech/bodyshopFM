"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageCarouselProps {
  images: string[]
  onHover?: () => void
  onClick?: () => void
}

export function ImageCarousel({ images, onHover, onClick }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const nextImage = () => {
    if (!isTransitioning) {
      // Play click sound
      if (onClick) onClick()
      
      setIsTransitioning(true)
      setDirection('next')
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const previousImage = () => {
    if (!isTransitioning) {
      // Play click sound
      if (onClick) onClick()
      
      setIsTransitioning(true)
      setDirection('prev')
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  return (
    <div className="relative h-full group">
      <div className="relative w-full h-full overflow-hidden">
        {/* Current image */}
        <div className="w-full h-full">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt="Carousel image"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      <button
        onClick={previousImage}
        onMouseEnter={onHover}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-[#E6B800] text-white border-2 border-white box-content"
        aria-label="Previous image"
        style={{
          boxShadow: 'inset 1px 1px 0 0 rgba(255, 255, 255, 0.5), inset -1px -1px 0 0 rgba(0, 0, 0, 0.2)'
        }}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextImage}
        onMouseEnter={onHover}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-[#E6B800] text-white border-2 border-white box-content"
        aria-label="Next image"
        style={{
          boxShadow: 'inset 1px 1px 0 0 rgba(255, 255, 255, 0.5), inset -1px -1px 0 0 rgba(0, 0, 0, 0.2)'
        }}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}

