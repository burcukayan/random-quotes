"use client";

import { use } from "react";
import { QuotesContext } from "@/app/QuotesContext";
import { QuoteCard } from "@/app/QuoteCard";
import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  const {
    currentQuote,
    handleQuoteIndexUpdate,
    handleLikeQuote,
    handleUnlikeQuote,
  } = use(QuotesContext);

  const { user, isLoading } = useUser();

  if (!currentQuote) return null;

  const { id, quote, author, isLiked } = currentQuote;

  return (
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
      />
    </main>
  );
}
