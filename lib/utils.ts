import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
;("use client")

// Function to get all shelters (both predefined and custom)
export function getAllShelters() {
  // Import can't be at the top level in a client component when using localStorage
  const { shelters } = require("./data")

  // Get custom shelters from localStorage
  const customShelters = JSON.parse(localStorage.getItem("customShelters") || "[]")

  // Combine and return all shelters
  return [...shelters, ...customShelters]
}

// Function to get a shelter by ID
export function getShelterById(id: string) {
  const allShelters = getAllShelters()
  return allShelters.find((shelter) => shelter.id === id)
}

// Function to format currency
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Function to format date
export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

