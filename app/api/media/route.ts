import { NextResponse } from "next/server";
import { getTrending } from "@/lib/tmdb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind") || "movie";
  const page = parseInt(searchParams.get("page") || "1", 10);

  // FIX: Explicitly cast or handle 'anime' here if your function signature is strict
  const mediaKind = kind as "movie" | "tv" | "anime";

  try {
    const data = await getTrending(mediaKind, page);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}
