"use client";

import { use } from "react";
import { H3 } from "@/components/typography/H3";
import { QuotesContext } from "@/app/QuotesContext";
import { Button } from "@/components/Button";

export default function LikedQuotesPage() {
  const { quotes, handleUnlikeQuote } = use(QuotesContext);

  const likedQuotes = quotes.filter((q) => q.isLiked);

  return (
    <main className="min-h-screen flex flex-col items-center py-16 bg-background px-4 sm:px-6">
      <H3 element="h1">Liked Quotes</H3>

      <div className="mt-10 flex flex-col gap-6 w-[700px] max-w-full">
        {likedQuotes.length === 0 ? (
          <p className="text-center text-slate-500 text-lg">
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
}
