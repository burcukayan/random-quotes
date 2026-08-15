import { Button } from "@/components/ui/button";
import Link from "next/link";

import { H3 } from "@/components/typography/H3";

export default function NewQuoteSuccessPage() {
  return (
    <main className="min-h-screen flex-col justify-items-center pt-20">
      <div className="max-w-md mx-auto text-center">
        <H3 element="h1">
          Thank you for adding a new quote. It&apos;s now sent to administrator
          for review.
        </H3>

        <Button className="mt-6" asChild>
          <Link href="/user/quotes/new">Add another quote</Link>
        </Button>
      </div>
    </main>
  );
}
