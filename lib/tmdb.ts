const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Ensure the function is exported with the exact name "getTrending"
export async function getTrending() {
  const response = await fetch(`${BASE_URL}/trending/all/day`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`, // Or use ?api_key=${TMDB_API_KEY} if using query params
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trending data from TMDB");
  }

  return response.json();
}
