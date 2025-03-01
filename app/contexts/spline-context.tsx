"use client"

import React, { createContext, useContext, useState, useRef, useEffect } from 'react'

interface SplineContextType {
  splineLoaded: boolean
  setSplineLoaded: (loaded: boolean) => void
  splineInstance: any | null
  setSplineInstance: (instance: any) => void
}

const SplineContext = createContext<SplineContextType>({
  splineLoaded: false,
  setSplineLoaded: () => {},
  splineInstance: null,
  setSplineInstance: () => {},
})

export function useSpline() {
  return useContext(SplineContext)
}

export function SplineProvider({ children }: { children: React.ReactNode }) {
  const [splineLoaded, setSplineLoaded] = useState(false)
  const [splineInstance, setSplineInstance] = useState<any>(null)

  return (
    <SplineContext.Provider 
      value={{ 
        splineLoaded, 
        setSplineLoaded, 
        splineInstance, 
        setSplineInstance 
      }}
    >
      {children}
    </SplineContext.Provider>
  )
} 