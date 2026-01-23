import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1E293B] placeholder:text-[#94A3B8] transition-colors outline-none",
        "focus:border-[#5FB3B3] focus:ring-2 focus:ring-[#5FB3B3]/20",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F8FAFC]",
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#1E293B]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
