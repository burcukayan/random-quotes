import { Quote } from "@/types/quotes";

export interface ApiQuote extends Quote {
  likedBy?: string[];
  createdBy: string;
}

export async function fetchQuotesFromApi(): Promise<ApiQuote[]> {
  const response = await fetch("/api/quotes");

  if (!response.ok) {
    throw new Error("Unable to fetch data");
  }

  const data = await response.json();

  return Array.isArray(data) ? data : data.quotes || [];
}
