import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-pill border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ink/20 focus-visible:ring-2 focus-visible:ring-ink/10 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 uppercase tracking-widest [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-ink text-canvas hover:opacity-90 shadow-premium-sm",
        outline:
          "border-hairline bg-canvas-soft text-ink hover:bg-surface-strong hover:border-hairline-strong shadow-sm",
        secondary:
          "bg-surface-strong text-ink hover:bg-hairline/20",
        ghost:
          "text-muted hover:bg-canvas-soft hover:text-ink",
        destructive:
          "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-6",
        xs: "h-7 gap-1.5 px-3 text-[10px]",
        sm: "h-8.5 gap-1.5 px-4 text-[11px]",
        lg: "h-12 gap-2 px-8 text-base",
        xl: "h-14 gap-2.5 px-10 text-lg",
        icon: "size-10",
        "icon-xs": "size-7",
        "icon-sm": "size-8.5",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <ButtonPrimitive
        data-slot="button"
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
