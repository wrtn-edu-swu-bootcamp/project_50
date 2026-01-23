import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-20 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#1E293B] placeholder:text-[#94A3B8] transition-colors outline-none resize-y",
        "focus:border-[#5FB3B3] focus:ring-2 focus:ring-[#5FB3B3]/20",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F8FAFC]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
