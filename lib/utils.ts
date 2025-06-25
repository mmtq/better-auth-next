import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function VALID_DOMAINS(){
  const domains = ['google.com', 'outlook.com', 'yahoo.com']

  if (process.env.NODE_ENV==='development'){
    domains.push('example.com')
  }

  return domains
}