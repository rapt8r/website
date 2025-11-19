import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
}

const paddingClasses = {
  none: "",
  sm: "px-2 sm:px-4",
  md: "px-4 md:px-6",
  lg: "px-4 md:px-6 lg:px-8",
}

const sizeClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  full: "max-w-full",
}

export function Container({
  children,
  className,
  size = "xl",
  padding = "md",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        size !== "full" && sizeClasses[size],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
