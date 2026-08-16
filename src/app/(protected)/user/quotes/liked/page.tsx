import { auth0 } from "@/lib/auth0";
import { getQuotes } from "@/services/db/quotes";
import LikedQuotesClient from "./LikedQuotesClient";

export const dynamic = "force-dynamic";

export default async function LikedQuotesPage() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) return null;

  const quotes = await getQuotes(user.sub, true);

  const serializedQuotes = quotes.map((q) => ({
    ...q,
    _id: q._id?.toString(),
    likedBy: q.likedBy || [],
  }));

  return <LikedQuotesClient initialQuotes={serializedQuotes} />;
}
