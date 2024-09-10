// Import React library and its types
import * as React from "react"

// Import utility function 'cn' for class name manipulation
import { cn } from "@/lib/utils"

// Define the InputProps interface that extends the default HTML input attributes
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Define the Input component using React.forwardRef
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  // The component accepts props and a ref, destructuring the className and type from props
  ({ className, type, ...props }, ref) => {
    return (
      // Render the input element
      <input
        // Set the input type (like "text", "password", etc.)
        type={type}
        // Combine default classes and any additional className passed through props
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className // Include any custom classes passed as props
        )}
        // Attach the ref to the input element
        ref={ref}
        // Spread remaining props onto the input element (like value, onChange, etc.)
        {...props}
      />
    )
  }
)

// Set displayName to make the component easier to identify during debugging
Input.displayName = "Input"

// Export the Input component for use in other parts of the application
export { Input }
