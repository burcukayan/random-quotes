import { NextResponse } from "next/server";
import { getDb, Collections } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,

  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;

    if (!id) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const db = await getDb();
    const collection = db.collection(Collections.quotes);

    const quote = await collection.findOne({ _id: new ObjectId(id) });

    if (!quote) {
      return NextResponse.json(
        { error: "Could not find quote" },
        { status: 404 },
      );
    }

    return NextResponse.json(quote);
  } catch (error) {
    console.error("Error while checking singular data:", error);
    return NextResponse.json(
      { error: "Unable to fetch data" },
      { status: 500 },
    );
  }
}
