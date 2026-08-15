import { NextResponse } from "next/server";
import { getQuotes } from "@/services/db/quotes";
import { auth0 } from "@/lib/auth0";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const isLiked = searchParams.get("liked") === "true";

    let userId: string | undefined = undefined;

    if (isLiked) {
      const session = await auth0.getSession();
      userId = session?.user?.sub;

      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const quotes = await getQuotes(userId, isLiked);

    return NextResponse.json({ quotes });
  } catch (error) {
    console.error("Failed to fetch quotes from DB:", error);
    return NextResponse.json(
      { error: "Could not get quotes." },
      { status: 500 },
    );
  }
}
