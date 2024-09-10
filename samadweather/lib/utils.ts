// Import the 'ClassValue' type and 'clsx' function from the 'clsx' library
// 'clsx' helps conditionally merge class names based on various inputs (strings, objects, arrays, etc.)
import { type ClassValue, clsx } from "clsx"

// Import 'twMerge' from 'tailwind-merge'
// 'twMerge' intelligently merges Tailwind CSS class names, ensuring there are no conflicting or duplicate styles
import { twMerge } from "tailwind-merge"

// Define the 'cn' function, which takes multiple class values (strings, arrays, objects, etc.) as arguments
export function cn(...inputs: ClassValue[]) {
  // First, 'clsx' processes the input class values to conditionally combine them
  // Then, 'twMerge' is used to resolve any conflicting Tailwind CSS class names
  return twMerge(clsx(inputs))
}
