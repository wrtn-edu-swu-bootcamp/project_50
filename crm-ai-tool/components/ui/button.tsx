import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#5FB3B3] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-[#5FB3B3] text-white hover:bg-[#4A9999] active:bg-[#3D8080]",
        destructive:
          "bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C]",
        outline:
          "border-2 border-[#5FB3B3] bg-transparent text-[#5FB3B3] hover:bg-[#5FB3B3]/10 active:bg-[#5FB3B3]/20",
        secondary:
          "bg-[#1E293B] text-white hover:bg-[#334155] active:bg-[#475569]",
        ghost:
          "bg-transparent text-[#475569] hover:bg-[#F1F5F9] active:bg-[#E2E8F0]",
        link: "text-[#5FB3B3] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-lg gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-12 rounded-xl px-6 text-base has-[>svg]:px-4",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
