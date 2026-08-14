import { NextRequest, NextResponse } from "next/server";
import { getMediaDetail, searchAnime } from "@/lib/tmdb";
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
    // If we want to support a list endpoint (e.g. /api/media?type=anime&page=1),
    // we could add logic here. For now, we only support detail fetch by ID.
    
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
