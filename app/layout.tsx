import type React from "react"
import type { Metadata } from "next"
import { AudioProvider } from "./components/audio-player"
import "./globals.css"
import { SoundProvider } from "@/components/SoundProvider"
import { Footer } from "@/components/Footer"

export const metadata: Metadata = {
  title: "Bodyshop FM",
  description: "Official website for Bodyshop FM",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SoundProvider>
          <AudioProvider>
            {children}
            <Footer />
          </AudioProvider>
        </SoundProvider>
      </body>
    </html>
  )
}



import './globals.css'