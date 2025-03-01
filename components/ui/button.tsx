"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { useRef } from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground animate-subtle-blink",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  onHover?: () => void
  onClick?: () => void
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, onHover, onClick, ...props }, ref) => {
    const clickSoundRef = useRef<HTMLAudioElement | null>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Play click sound
      try {
        if (!clickSoundRef.current) {
          clickSoundRef.current = new Audio("/click.mp3")
        }
        clickSoundRef.current.currentTime = 0
        clickSoundRef.current.play().catch(() => {
          // Ignore audio errors
        })
      } catch (error) {
        // Ignore audio errors
      }

      // Add active animation class
      const button = e.currentTarget
      button.classList.add("animate-button-press")
      setTimeout(() => {
        button.classList.remove("animate-button-press")
      }, 150)

      // Call original onClick if provided
      if (onClick) {
        onClick()
      }
      if (props.onClick) {
        props.onClick(e)
      }
    }

    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        onMouseEnter={onHover}
        onClick={handleClick}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }

