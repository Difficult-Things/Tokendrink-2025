import { GenerationColours } from "@/types/data";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function colourToGenerationIndex(colour: string): number {
  const index = GenerationColours.indexOf(colour);
  return index !== -1 ? index : -1; // Return index or -1 if not found
}
