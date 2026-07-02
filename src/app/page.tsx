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

  const { id, _id,  quote, author, isLiked, createdBy } = currentQuote;

  const isCreator = Boolean(user?.sub && createdBy && user.sub === createdBy);

  return (
    <main className="min-h-screen flex items-center justify-center">
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
    </main>
  );
}
