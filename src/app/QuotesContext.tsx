"use client";

import { createContext, useState, type ReactNode } from "react";
import { quotes as initialQuotes, type Quote } from "@/quotes";
import { getRandomNumber } from "@/utils/helper-functions";


interface QuotesContextInterface {
  quotes: Quote[];
  quoteIndex: number;
  currentQuote: Quote | null;
  handleQuoteIndexUpdate: () => void;
  handleLikeQuote: (id: number) => void;
  handleUnlikeQuote: (id: number) => void;
}

const InitialQuotesContext: QuotesContextInterface = {
  quotes: [],
  quoteIndex: 0,
  currentQuote: null,
  handleQuoteIndexUpdate: () => console.log(''),
  handleLikeQuote: () => console.log(''),
  handleUnlikeQuote: () => console.log(''),
};

export const QuotesContext = createContext<QuotesContextInterface>(InitialQuotesContext);

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
