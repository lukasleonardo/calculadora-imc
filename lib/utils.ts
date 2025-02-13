import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const ImagensShortner: Record<string, string> = {
  'imc': './workout.svg',
  'temperatura': '/temp.svg',
  'distance': './distance.svg',
  'currency': './money.svg',
  'velocidade': './speed.svg',
};
