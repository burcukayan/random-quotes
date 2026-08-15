"use server";

import { auth0 } from "@/lib/auth0";
import { toggleLikeQuote } from "@/services/db/quotes";
import { revalidatePath } from "next/cache";

export async function toggleLikeAction(
  quoteId: string,
  action: "like" | "unlike",
) {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) {
    throw new Error("You must be logged in to like a quote");
  }

  await toggleLikeQuote(quoteId, user.sub, action);

  revalidatePath("/");
  revalidatePath("/user/quotes/liked");
}
