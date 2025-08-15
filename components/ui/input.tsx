import type * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground",
        "flex h-10 w-full min-w-0 rounded-lg border border-input/60 px-4 py-2 text-base shadow-sm transition-all duration-200 outline-none",
        "bg-gradient-to-br from-background to-muted/20 backdrop-blur-sm",
        "hover:border-input hover:shadow-md hover:bg-gradient-to-br hover:from-background hover:to-muted/30",
        "focus-visible:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:shadow-lg",
        "focus-visible:bg-gradient-to-br focus-visible:from-background focus-visible:to-primary/5",
        "aria-invalid:border-destructive/60 aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/50",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "md:text-sm",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
