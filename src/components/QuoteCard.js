import { H3 } from "@/components/typography/H3";
import { Button } from "@/components/Button";

export function QuoteCard({ quoteObj, onLike }) {
  if (!quoteObj) return null;

  return (
    <div className="flex flex-col gap-4">
      <H3 element="p">"{quoteObj.quote}"</H3>

      <span className="text-md font-semibold text-slate-900 self-end">
        - {quoteObj.author}
      </span>

      <div className="flex items-center justify-between mt-4">
        <Button variant="secondary" onClick={() => onLike(quoteObj.id)}>
          ❤️ Like
        </Button>
        <span className="font-semibold text-slate-800 bg-slate-200 px-3 py-1 rounded-md">
          Likes: {quoteObj.likeCount}
        </span>
      </div>
    </div>
  );
}
