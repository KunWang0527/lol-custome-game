import * as React from "react"

const Button = React.forwardRef(({ 
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}, ref) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "ghost":
        return "hover:bg-accent hover:text-accent-foreground"
      default:
        return "bg-primary text-primary-foreground hover:bg-primary/90"
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case "icon":
        return "h-10 w-10"
      default:
        return "h-10 px-4 py-2"
    }
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${getVariantClasses()} ${getSizeClasses()} ${className}`}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }