"use client";

import { createContext, useState } from "react";
import { quotes as initialQuotes } from "@/quotes";
import { getRandomNumber } from "@/utils/helper-functions";

export const QuotesContext = createContext({});

export function QuotesContextProvider({ children }) {
  const [quotes, setQuotes] = useState(() =>
    initialQuotes.map((q, index) => ({ ...q, id: index, isLiked: false })),
  );

  const [quoteIndex, setQuoteIndex] = useState(0);

  function handleQuoteIndexUpdate() {
    let nextIndex;

    do {
      nextIndex = getRandomNumber(0, quotes.length - 1);
    } while (nextIndex === quoteIndex && quotes.length > 1);

    setQuoteIndex(nextIndex);
  }

  function handleLikeQuote(id) {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.id === id ? { ...quote, isLiked: true } : quote,
      ),
    );
  }

  function handleUnlikeQuote(id) {
    setQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.id === id ? { ...quote, isLiked: false } : quote,
      ),
    );
  }

  const currentQuote = quotes[quoteIndex];

  return (
    <QuotesContext
      value={{
        quotes,
        quoteIndex,
        currentQuote,
        handleQuoteIndexUpdate,
        handleLikeQuote,
        handleUnlikeQuote,
      }}
    >
      {children}
    </QuotesContext>
  );
}
