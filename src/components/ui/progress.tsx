import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  indicatorColor?: string // Puede ser clase de Tailwind o un color crudo (hex, rgb...)
}

function Progress({
  className,
  value,
  indicatorColor = "bg-primary", // Fallback por defecto
  ...props
}: ProgressProps) {
  const isTailwindClass = indicatorColor?.startsWith("bg-") || indicatorColor?.includes(" ")

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 transition-all",
          isTailwindClass ? indicatorColor : undefined
        )}
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: !isTailwindClass ? indicatorColor : undefined,
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
