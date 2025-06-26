import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function VALID_DOMAINS(){
  const domains = ['gmail.com', 'outlook.com', 'yahoo.com']

  if (process.env.NODE_ENV==='development'){
    domains.push('example.com')
  }

  return domains
}

export function normalizeName(name: string) {
  return name
    .trim()                              // Remove leading/trailing spaces
    .replace(/\s+/g, ' ')                // Collapse multiple spaces
    .toLowerCase()                       // Optional: unify case
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize first letter of each word
}
