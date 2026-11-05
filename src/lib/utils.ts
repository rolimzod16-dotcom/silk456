import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** A pasted photo link from an unknown host can't go through image optimization without breaking the page. */
export function isForeignPhoto(src: string) {
  return /^https?:/i.test(src) && !/^https:\/\/[^/]+\.supabase\.co\//i.test(src)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
