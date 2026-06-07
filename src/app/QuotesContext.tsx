"use client";

import { createContext, useState, type ReactNode } from "react";
import { quotes as initialQuotes, type Quote } from "@/quotes";
import { getRandomNumber } from "@/utils/helper-functions";
import { useUser } from "@auth0/nextjs-auth0/client";

export interface ContextQuote extends Quote {
  id: number;
  isLiked: boolean;
}

interface InternalQuote extends Quote {
  id: number;
  likedBy: string[];
}

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
  handleQuoteIndexUpdate: () => console.log(""),
  handleLikeQuote: () => console.log(""),
  handleUnlikeQuote: () => console.log(""),
};

export const QuotesContext =
  createContext<QuotesContextInterface>(InitialQuotesContext);

export function QuotesContextProvider({ children }) {
  const { user } = useUser();
  const [internalQuotes, setInternalQuotes] = useState<InternalQuote[]>(() =>
    initialQuotes.map((q, index) => ({ ...q, id: index, likedBy: [] })),
  );

  const [quoteIndex, setQuoteIndex] = useState(0);

  function handleQuoteIndexUpdate() {
    let nextIndex;

    do {
      nextIndex = getRandomNumber(0, internalQuotes.length - 1);
    } while (nextIndex === quoteIndex && internalQuotes.length > 1);

    setQuoteIndex(nextIndex);
  }

  function handleLikeQuote(id: number) {
    if (!user?.sub) return;
    setInternalQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.id === id && !quote.likedBy.includes(user.sub!)
          ? { ...quote, likedBy: [...quote.likedBy, user.sub!] }
          : quote
      ),
    );
  }

  function handleUnlikeQuote(id: number) {
    if (!user?.sub) return;
    setInternalQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.id === id ? { ...quote, likedBy: quote.likedBy.filter((userId) => userId !== user.sub!) } : quote
      ),
    );
  }

  const mappedQuotes: ContextQuote[] = internalQuotes.map((quote) => ({
    ...quote,
    isLiked: user?.sub ? quote.likedBy.includes(user.sub) : false,
  }));
  const currentQuote = mappedQuotes[quoteIndex] || null;

  return (
    <QuotesContext
      value={{
        quotes: mappedQuotes,
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
