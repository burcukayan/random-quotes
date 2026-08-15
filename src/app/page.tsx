import { auth0 } from "@/lib/auth0";
import { getQuotes } from "@/services/db/quotes";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user || null;

  const quotes = await getQuotes();

  const serializedQuotes = quotes.map((q) => ({
    ...q,
    _id: q._id?.toString(),
    likedBy: q.likedBy || [],
  }));

  return (
<<<<<<< Updated upstream
    <main className="min-h-screen flex items-center justify-center px-4 sm:px-6">
      <QuoteCard
        handleLikeQuote={() => handleLikeQuote(id)}
        handleUnlikeQuote={() => handleUnlikeQuote(id)}
        isLiked={isLiked}
        quote={quote}
        author={author}
        handleQuoteIndexUpdate={handleQuoteIndexUpdate}
        isLoggedIn={!!user}
        isLoadingUser={isLoading}
        isCreator={isCreator}
        quoteId={_id as string}
      />
=======
    <main className="min-h-screen flex items-center justify-center">
      <HomeClient initialQuotes={serializedQuotes} user={user} />
>>>>>>> Stashed changes
    </main>
  );
}
