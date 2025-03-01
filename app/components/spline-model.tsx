"use client"

import Spline from "@splinetool/react-spline/next"
import { memo } from "react"

const SplineModel = memo(function SplineModel() {
  return (
    <div className="h-[300px] border border-black bg-[#92C5FE] relative overflow-hidden">
      <Spline scene="https://prod.spline.design/7fqiXjkkoU0CDdur/scene.splinecode" className="w-full h-full" />
    </div>
  )
})

export default SplineModel

