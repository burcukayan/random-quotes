import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3 } from "@/components/typography/H3";

interface QuoteCardProps {
  handleLikeQuote: () => void;
  handleUnlikeQuote: () => void;
  isLiked?: number | boolean;
  quote: string;
  author: string;
  handleQuoteIndexUpdate: () => void;
}

export function QuoteCard({
  handleLikeQuote,
  handleUnlikeQuote,
  isLiked,
  quote,
  author,
  handleQuoteIndexUpdate,
}: QuoteCardProps) {
  return (
    <Card size="lg" className="mx-auto w-full max-w-sm">
      <CardContent className={"flex flex-col"}>
        <div className="self-end">
          {isLiked ? (
            <Button variant={"ghost"} onClick={handleUnlikeQuote}>
              ❤️ Liked
            </Button>
          ) : (
            <Button variant={"ghost"} onClick={handleLikeQuote}>
              🤍 Like
            </Button>
          )}
        </div>
        <H3 element="p">
          {quote}
        </H3>
        <span className="text-md font-semibold text-muted-foreground self-end mt-4">
          - {author}
        </span>

        <div className="mt-8 flex flex-col">
          <Button
           
            className="w-full"
            onClick={handleQuoteIndexUpdate}
          >
            Next Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
