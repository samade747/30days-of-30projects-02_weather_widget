import * as React from "react";


// Importing Slot from Radix UI to use for rendering components conditionally 
import { Slot } from "@radix-ui/react-slot";

// Importing class-variance-authority's cva and VariantProps for creating a customizable and variant-based styling utility
import { cva, VariantProps } from "class-variance-authority";

// Importing a utility function `cn` for merging and conditionally applying class names (usually a helper function for Tailwind CSS)
import { cn } from "@/lib/utils"

// Define buttonVariants using the cva function for handling styles and variants
const buttonVariants = cva(
    // Base styles applied to the button
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

    // Variants object to define different styles for variant and size options
    {
    // Style variants for different types of buttons (default, destructive, outline, etc.)
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",   // Default button style
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90", // Style for destructive actions (like delete)
            outline: "border border-input hover:bg-accent hover:text-accent-foreground",
            link: "underline-offset-4 hover:underline text-primary",
            },        
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            },
        }
)


// ButtonProps interface extends HTML button properties and adds variants for the button styling, along with an asChild prop for custom component rendering
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean // Optional prop to render the button as a child component instead of a button element
}

// Creating the Button component using React.forwardRef to allow passing refs to the button element
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
      // Choose which component to render, either the Slot or the default "button"
      const Comp = asChild ? Slot : "button"
      // Return the rendered button (or slot component) with computed class names based on variant and size
    return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))} // Apply the computed styles using the cva utility
          ref={ref} // Forward the ref
          {...props} // Spread remaining props (like onClick, disabled, etc.)
        />
      )
    }
  )


// Setting the displayName for the Button component for better debugging experience in React DevTools
Button.displayName = "Button"

// Exporting the Button component and the buttonVariants function for use in other parts of the project
export { Button, buttonVariants }