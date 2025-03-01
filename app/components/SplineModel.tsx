"use client"

import { useEffect, useState, useRef } from 'react'
import { useSpline } from '@/app/contexts/spline-context'

export default function SplineModel() {
  const [loading, setLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const { splineLoaded, setSplineLoaded, splineInstance, setSplineInstance } = useSpline()

  useEffect(() => {
    async function loadSpline() {
      if (splineLoaded && splineInstance) {
        // Spline is already loaded, just re-attach to container
        if (containerRef.current) {
          // Clear the container first
          while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild)
          }
          
          // Add the existing spline instance to the container
          containerRef.current.appendChild(splineInstance)
        }
        setLoading(false)
        return
      }

      try {
        // Only import Spline if it hasn't been loaded yet
        const Spline = await import('@splinetool/react-spline')
        
        // Spline object you want to load - initialize once
        const spline = await new Spline.default({
          scene: 'your-spline-file-url.spline',
          // Add any configuration options here
        })
        
        if (containerRef.current) {
          containerRef.current.appendChild(spline.el)
        }
        
        // Save reference in context
        setSplineInstance(spline.el)
        setSplineLoaded(true)
        setLoading(false)
      } catch (error) {
        console.error('Error loading Spline:', error)
        setLoading(false)
      }
    }

    loadSpline()

    return () => {
      // Don't destroy the instance on unmount, just detach
      if (containerRef.current && splineInstance && containerRef.current.contains(splineInstance)) {
        containerRef.current.removeChild(splineInstance)
      }
    }
  }, [splineLoaded, splineInstance, setSplineLoaded, setSplineInstance])

  return (
    <div className="w-full h-[300px]" ref={containerRef}>
      {loading && <div className="flex items-center justify-center h-full">Loading 3D model...</div>}
    </div>
  )
} 