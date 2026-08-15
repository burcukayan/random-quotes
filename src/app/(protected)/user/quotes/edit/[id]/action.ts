"use server";

import { auth0 } from "@/lib/auth0";
import { AddNewQuoteState, newQuoteSchema } from "@/types/quotes";

import { updateQuoteById } from "@/services/db/quotes";
import z from "zod";
import { revalidatePath } from "next/cache";

export async function updateQuote(
  _currentState: AddNewQuoteState,
  formData: FormData,
): Promise<AddNewQuoteState> {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!session || !user) {
    return {
      success: false,
      message: "Please sign in to edit quotes.",
    };
  }

  const quoteId = formData.get("quoteId") as string;
  if (!quoteId) {
    return { success: false, message: "Missing Quotes ID!" };
  }

  const rawData = {
    author: String(formData.get("author") ?? ""),
    quote: String(formData.get("quote") ?? ""),
    category: String(formData.get("category") ?? ""),
  };

  const validationOutput = newQuoteSchema.safeParse(rawData);

  if (!validationOutput.success) {
    const validationErrors = z.flattenError(validationOutput.error);
    return {
      success: false,
      errors: validationErrors,
      data: rawData,
    };
  }

  try {
    const result = await updateQuoteById(quoteId, user.sub, {
      quote: validationOutput.data.quote,
      author: validationOutput.data.author,
      category: validationOutput.data.category,
    });

    if (result.matchedCount === 0) {
      return {
        success: false,
        message:
          "You are not authorized to edit quote or the quote was not found.",
      };
    }

    revalidatePath("/");
    revalidatePath("/api/quotes");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Update error:", error);
    return {
      success: false,
      message: "There is an issue occured while connecting to database.",
    };
  }
}
