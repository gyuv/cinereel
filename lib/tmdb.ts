const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// ... (keep your existing getTrending or other functions here)

export async function getMediaDetail(mediaType: string, id: string) {
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
