const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getTrending() {
  const response = await fetch(`${BASE_URL}/trending/all/day`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trending data from TMDB");
  }

  return response.json();
}

// Updated to accept id as string | number to prevent type mismatches
export async function getMediaDetail(mediaType: string, id: string | number) {
  const response = await fetch(`${BASE_URL}/${mediaType}/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch details for ${mediaType} with ID ${id}`);
  }

  return response.json();
}
