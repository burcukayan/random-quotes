import { getDb, Collections } from "@/lib/db";
import { ObjectId } from "mongodb";

interface CreateQuoteParams {
  quote: string;
  author: string;
  category: string;
  createdBy: string;
}

export async function createQuote(data: CreateQuoteParams) {
  const db = await getDb();
  const col = db.collection(Collections.quotes);
  const now = new Date();

  const newQuote = {
    quote: data.quote,
    author: data.author,
    category: data.category,
    createdBy: data.createdBy,
    adminApproved: false,
    createdAt: now,
    updatedAt: now,
  };

  const result = await col.insertOne(newQuote);

  return {
    ...newQuote,
    _id: result.insertedId,
  };
}

export async function getQuoteById(id: string) {
  const db = await getDb();
  const collection = db.collection(Collections.quotes);

  const quote = await collection.findOne({ _id: new ObjectId(id) });

  return quote;
}

export async function getQuotes(userId?: string, likedOnly: boolean = false) {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const query: Record<string, any> = {};

  if (likedOnly && userId) {
    query.likedBy = userId;
  }

  const quotes = await col.find(query).toArray();

  return quotes;
}

interface UpdateQuoteParams {
  quote: string;
  author: string;
  category: string;
}

export async function updateQuoteById(
  quoteId: string,
  userId: string,
  data: UpdateQuoteParams,
) {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const filter = {
    _id: new ObjectId(quoteId),
    createdBy: userId,
  };

  const updateDoc = {
    $set: {
      quote: data.quote,
      author: data.author,
      category: data.category,
      updatedAt: new Date(),
    },
  };

  const result = await col.updateOne(filter, updateDoc);

  return result;
}

export async function toggleLikeQuote(
  quoteId: string,
  userId: string,
  action: "like" | "unlike",
) {
  const db = await getDb();
  const col = db.collection(Collections.quotes);

  const filter = { _id: new ObjectId(quoteId) };

  const updateDoc: any = action === "like"
    ? { $addToSet: { likedBy: userId } } 
    : { $pull: { likedBy: userId } };

  await col.updateOne(filter, updateDoc);
}
