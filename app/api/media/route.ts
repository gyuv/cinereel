import { NextResponse } from "next/server";
import { getTrending } from "@/lib/tmdb";

export async function GET(request: Request) {
  try {
    const data = await getTrending();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
