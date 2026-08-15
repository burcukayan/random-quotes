import { Collections, getDb } from "@/lib/db";
import { Quote } from "@/types/quotes";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();
    const col = db.collection<Quote>(Collections.quotes);
    const quotes = await col.find({}).toArray();

    return Response.json({ quotes });
  } catch (error) {
    console.error("Failed to fetch quotes from DB:", error);
    return Response.json({ error: "Could not get quotes." }, { status: 500 });
  }
}
