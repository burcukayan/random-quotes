"use client";

import { useState } from "react";
import { QuoteCard } from "@/app/QuoteCard";
import { getRandomNumber } from "@/utils/helper-functions";
import { toggleLikeAction } from "@/app/actions/like-action";

export default function HomeClient({
  initialQuotes,
  user,
}: {
  initialQuotes: any[];
  user: any;
}) {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const currentQuote = quotes[quoteIndex];

  if (!currentQuote) return null;

  const isLiked = user?.sub ? currentQuote.likedBy?.includes(user.sub) : false;
  const isCreator = Boolean(
    user?.sub && currentQuote.createdBy && user.sub === currentQuote.createdBy,
  );

  const handleQuoteIndexUpdate = () => {
    if (quotes.length <= 1) return;
    let nextIndex;
    do {
      nextIndex = getRandomNumber(0, quotes.length - 1);
    } while (nextIndex === quoteIndex);
    setQuoteIndex(nextIndex);
  };

  const handleLikeQuote = async () => {
    if (!user?.sub) return;

    setQuotes((prev) =>
      prev.map((q, idx) =>
        idx === quoteIndex && !q.likedBy?.includes(user.sub)
          ? { ...q, likedBy: [...(q.likedBy || []), user.sub] }
          : q,
      ),
    );

    await toggleLikeAction(currentQuote._id, "like");
  };

  const handleUnlikeQuote = async () => {
    if (!user?.sub) return;

    setQuotes((prev) =>
      prev.map((q, idx) =>
        idx === quoteIndex
          ? {
              ...q,
              likedBy: q.likedBy?.filter((id: string) => id !== user.sub) || [],
            }
          : q,
      ),
    );

    await toggleLikeAction(currentQuote._id, "unlike");
  };

  return (
    <QuoteCard
      handleLikeQuote={handleLikeQuote}
      handleUnlikeQuote={handleUnlikeQuote}
      isLiked={isLiked}
      quote={currentQuote.quote}
      author={currentQuote.author}
      handleQuoteIndexUpdate={handleQuoteIndexUpdate}
      isLoggedIn={!!user}
      isLoadingUser={false}
      isCreator={isCreator}
      quoteId={currentQuote._id}
    />
  );
}
