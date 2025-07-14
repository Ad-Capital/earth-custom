import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 sm:w-[70%] w-[90%] border-b border-input bg-background px-3 py-2 text-sm",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "placeholder:text-muted-foreground placeholder:text-right",
          "focus:outline-none focus:border-b-2 focus:border-primary focus:bg-transparent transition-all",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "autofill:bg-transparent",
          ":-webkit-autofill { -webkit-box-shadow: 0 0 0 30px transparent inset !important; }",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }