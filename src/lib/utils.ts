import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ISOToDate(date: string) {
  if (date) {
    const convertDate = new Date(date);
    return (
      convertDate.getFullYear() +
      "-" +
      (convertDate.getMonth() + 1) +
      "-" +
      convertDate.getDate()
    );
  }
}

export function getApiUrl() {
  if (process.env.NODE_ENV === "development") return "http://localhost:3000";
  else return "https://pawandai-github.vercel.app";
}
