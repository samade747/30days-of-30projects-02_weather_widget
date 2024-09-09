// Import React library and its types
import * as React from "react"

// Import utility function 'cn' for class names
import { cn } from "@/lib/utils"


// Define a 'Card' component using React.forwardRef
const Card = React.forwardRef<
HTMLDivElement, // type of the html elemet the ref will refer to 
React.HTMLAttributes<HTMLDivElement> // type of props the component will accept 
>(({ className, ...props }, ref) => (
  <div 
  ref={ref}
  className={cn("rounded-lg border bg-card text-card-foreground shadow-sm",
    className
  )}
  {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement, // type of the html elemet the ref will refer to
    React.HTMLAttributes<HTMLDivElement> // type of props the component will accept
    >(({ className, ...props }, ref) => (
        <h3 
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",className )}
            {...props}
  />
))
Card.displayName = "CardHeader"

// Define a 'CardTitle' component using React.forwardRef
const CardTitle = React.forwardRef<
  HTMLParagraphElement, // Type of the HTML element the ref will refer to
  React.HTMLAttributes<HTMLHeadingElement> // Type of props the component will accept
>(({ className, ...props }, ref) => (
  <h3
    ref={ref} // Attach the ref to the h3 element
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight", // Default styles
      className // Allow additional classes to be passed in
    )}
    {...props} // Spread remaining props onto the h3 element
  />
))
CardTitle.displayName = "CardTitle" // Set displayName for debugging purposes


const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }



