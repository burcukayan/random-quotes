import { auth0 } from "@/lib/auth0";
import { getQuotes } from "@/services/db/quotes";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user || null;

  const quotes = await getQuotes();

  const serializedQuotes = quotes.map((q) => ({
    ...q,
    _id: q._id?.toString(),
    likedBy: q.likedBy || [],
  }));

  return (
    <main className="min-h-screen flex items-center justify-center">
      <HomeClient initialQuotes={serializedQuotes} user={user} />
    </main>
  );
}
