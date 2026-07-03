import z from "zod";

export const QUOTE_CATEGORIES = ["Motivation", "Wisdom", "Humor", "Life", "Other"] as const;

export const newQuoteSchema = z.object({
  author: z
    .string()
    .trim()
    .min(2, { message: "Author name should be at least 2 characters long" })
    .max(50, {
      message:
        "Author name should be 50 characters long maximum. Please try a shorter name.",
    }),
  quote: z
    .string()
    .trim()
    .min(5, { message: "Quote should be at least 5 characters long" })
    .max(300, {
      message:
        "Quote should be 300 characters long maximum. Please try a shorter one.",
    }),

    category: z.enum(QUOTE_CATEGORIES),
});

export type NewQuoteInput = z.infer<typeof newQuoteSchema>;

export type AddNewQuoteState = {
  success: boolean;
  errors?: {
    formErrors: string[];
    fieldErrors: {
      author?: string[];
      quote?: string[];
      category?: string[];
      [key: string]: string[] | undefined;
    };
  };
  message?: string;
  data?: {
    author: string;
    quote: string;
    category: string;
  };
};

export interface Quote {
  quote: string;
  author: string;
  category: string;
  isLiked?: boolean;
  id?: number;
}
