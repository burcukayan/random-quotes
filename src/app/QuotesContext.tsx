"use client";

import { createContext, useState, useEffect } from "react";
import { getRandomNumber } from "@/utils/helper-functions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Quote } from "@/types/quotes";

export interface ContextQuote extends Quote {
  id: number;
  isLiked: boolean;
  createdBy: string;
}

interface InternalQuote extends Quote {
  id: number;
  likedBy: string[];
  createdBy: string;
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

export function QuotesContextProvider({ children }: { children: React.ReactNode}) {
  const { user } = useUser();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [internalQuotes, setInternalQuotes] = useState<InternalQuote[]>([]);

  useEffect(() => {
    async function fetchQuotesFromDB() {
      try {
        const response = await fetch("/api/quotes");
        if (!response.ok) throw new Error("Unable to fetch data");
        const data = await response.json();

        const actualQuotesArray = Array.isArray(data) ? data : data.quotes || [];

        const formattedQuotes = actualQuotesArray.map((q: any, index: number) => ({
          ...q,
          id: index,
          _id: q._id,
          likedBy: q.likedBy ||[],
          createdBy: q.createdBy,
        }));

        setInternalQuotes(formattedQuotes);
        } catch(error) {
          console.error("An issue occured whhile loading datas:", error);
        }
      }
      fetchQuotesFromDB();
    }, []);
  
    

  function handleQuoteIndexUpdate() {
    if (internalQuotes.length === 0) return;

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
          : quote,
      ),
    );
  }

  function handleUnlikeQuote(id: number) {
    if (!user?.sub) return;
    setInternalQuotes((prevQuotes) =>
      prevQuotes.map((quote) =>
        quote.id === id
          ? {
              ...quote,
              likedBy: quote.likedBy.filter((userId) => userId !== user.sub!),
            }
          : quote,
      ),
    );
  }

  const mappedQuotes: ContextQuote[] = internalQuotes.map((quote) => ({
    ...quote,
    isLiked: user?.sub ? quote.likedBy.includes(user.sub) : false,
  }));
  const currentQuote = mappedQuotes[quoteIndex] || null;

  return (
    <QuotesContext.Provider
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
    </QuotesContext.Provider>
  );
}
