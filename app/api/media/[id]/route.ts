import { NextRequest, NextResponse } from "next/server";
import { getMediaDetail } from "@/lib/tmdb";
import type { MediaKind } from "@/types";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Await the params to extract the id
  const { id } = await params;
  
  // Default to 'movie' if no type is specified
  const kind = (req.nextUrl.searchParams.get("type") as MediaKind) ?? "movie";
  
  try {
    // If the kind is 'anime', we can pass it directly to getMediaDetail
    // Ensure your getMediaDetail function handles 'anime' by fetching from the correct source (e.g., TMDB TV with genre 16)
    const data = await getMediaDetail(kind, Number(id));
    
    // Basic validation to ensure we got data
    if (!data) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(`Error fetching ${kind} with ID ${id}:`, err);
    return NextResponse.json(
      { error: "Failed to fetch media details" }, 
      { status: 500 }
    );
  }
}

// Optional: If you want to support fetching a list of anime (Trending, Popular), 
// you can add a similar route at /api/media?type=anime&page=1
