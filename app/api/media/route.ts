import { NextRequest, NextResponse } from "next/server";
import { searchMedia, searchAnime } from "@/lib/tmdb";

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type");
  const query = req.nextUrl.searchParams.get("q");
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);

  try {
    if (type === "anime") {
      const data = await searchAnime({
        type: "anime",
        query: query || "",
        genres: [],
        yearFrom: 2000,
        yearTo: 2026,
        page,
        language: "all",
      });
      return NextResponse.json(data);
    }

    // Default to movie/tv search
    const data = await searchMedia({
      type: (type as any) || "all",
      query: query || "",
      genres: [],
      yearFrom: 2000,
      yearTo: 2026,
      page,
      language: "all",
    });
    
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
