import { auth0 } from "@/lib/auth0";
import { getQuotes } from "@/services/db/quotes";
import LikedQuotesClient from "./LikedQuotesClient";

export const dynamic = "force-dynamic";

export default async function LikedQuotesPage() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) return null;

<<<<<<< Updated upstream
  return (
    <main className="min-h-screen flex flex-col items-center py-16 bg-background px-4 sm:px-6">
      <H3 element="h1">Liked Quotes</H3>

      <div className="mt-10 flex flex-col gap-6 w-[700px] max-w-full">
        {likedQuotes.length === 0 ? (
          <p className="text-center text-slate-500 dark:text-slate-300 text-lg">
            You haven't liked any quotes yet.
          </p>
        ) : (
          likedQuotes.map((item) => (
            <article
              key={item.id}
              className="bg-card text-card-foreground border border-border rounded-xl p-6 flex flex-col shadow-sm relative"
            >
              <div className="absolute top-4 right-4">
                <Button
                  variant={"icon"}
                  onClick={() => handleUnlikeQuote(item.id)}
                >
                  ❌ Unlike
                </Button>
              </div>
              <p className="text-xl font-medium text-foreground pr-24">
                "{item.quote}"
              </p>
              <span className="text-md font-semibold text-muted-foreground self-end mt-2">
                - {item.author}
              </span>
            </article>
          ))
        )}
      </div>
    </main>
  );
=======
  const quotes = await getQuotes(user.sub, true);

  const serializedQuotes = quotes.map((q) => ({
    ...q,
    _id: q._id?.toString(),
    likedBy: q.likedBy || [],
  }));

  return <LikedQuotesClient initialQuotes={serializedQuotes} />;
>>>>>>> Stashed changes
}
