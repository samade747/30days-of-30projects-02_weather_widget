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
        
        
        
        />

        

