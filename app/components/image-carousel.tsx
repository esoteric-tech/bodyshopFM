"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageCarouselProps {
  images: string[]
  onHover?: () => void
}

export function ImageCarousel({ images, onHover }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const previousImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  return (
    <div className="relative h-[400px] mb-4 group">
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={images[currentImageIndex] || "/placeholder.svg"}
          alt="Carousel image"
          fill
          className={`object-cover transition-transform duration-500 ease-out ${
            isTransitioning ? "scale-105" : "scale-100"
          }`}
        />
      </div>

      <button
        onClick={previousImage}
        onMouseEnter={onHover}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black"
      >
        <ChevronLeft className="w-6 h-6" />
        <span className="sr-only">Previous image</span>
      </button>

      <button
        onClick={nextImage}
        onMouseEnter={onHover}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black"
      >
        <ChevronRight className="w-6 h-6" />
        <span className="sr-only">Next image</span>
      </button>
    </div>
  )
}

