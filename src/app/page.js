"use client";

import { quotes as initialQuotes } from "@/quotes";
import { Button } from "@/components/Button";
import { useState } from "react";
import { QuoteCard } from "@/components/QuoteCard";
import { getRandomNumber } from "@/utils/helper-functions";

export default function Home() {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const currentQuote = quotes[quoteIndex];

  function handleClick() {
    const randomIndex = getRandomNumber(0, quotes.length - 1);
    setQuoteIndex(randomIndex);
  }

  function handleLike(id) {
    setQuotes((prevQuotes) => {
      return prevQuotes.map((item) => {
        if (item.id === id) {
          return { ...item, likeCount: item.likeCount + 1 };
        }
        return item;
      });
    });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-200">
      <section className="bg-slate-50/50 rounded-md p-10 flex flex-col">
        <QuoteCard quoteObj={currentQuote} onLike={handleLike} />
        <div className="mt-6 flex flex-col">
          <Button variant={"primary"} onClick={handleClick}>
            {" "}
            Next Quote{" "}
          </Button>
        </div>
      </section>
    </main>
  );
}
