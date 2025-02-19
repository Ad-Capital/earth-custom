import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
      className={cn(
        "flex min-h-[10px] w-[70%] border-b border-input bg-background px-3 py-2 text-sm",
        "placeholder:text-muted-foreground placeholder:text-right",
        "focus:outline-none focus:border-b-2 focus:border-primary transition-all",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }