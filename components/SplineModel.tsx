"use client"

import Spline from "@splinetool/react-spline/next"
import { memo } from "react"

const SplineModel = memo(function SplineModel() {
  return (
    <div className="h-[300px] bg-[#D6AA00] relative overflow-hidden">
      <Spline scene="https://prod.spline.design/7fqiXjkkoU0CDdur/scene.splinecode" className="w-full h-full" />
    </div>
  )
})

export default SplineModel

