"use client";

import { use } from "react";
import { QuotesContext } from "@/app/QuotesContext";
import { QuoteCard } from "@/app/QuoteCard";

export default function Home() {
  const {
    currentQuote,
    handleQuoteIndexUpdate,
    handleLikeQuote,
    handleUnlikeQuote,
  } = use(QuotesContext);

  const { id, quote, author, isLiked } = currentQuote;

  return (
    <main className="min-h-screen flex items-center justify-center">
      <QuoteCard
        handleLikeQuote={() => handleLikeQuote(id)}
        handleUnlikeQuote={() => handleUnlikeQuote(id)}
        isLiked={isLiked}
        quote={quote}
        author={author}
        handleQuoteIndexUpdate={handleQuoteIndexUpdate}
      />
    </main>
  );
}
