export type MediaKind = "movie" | "tv" | "anime";

export interface MediaSummary {
  id: number;
  kind: MediaKind;
  title: string;
  overview: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  rating: number;
  year: string;
  genreIds: number[];
}

export interface HeroSlide {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  backdropUrl: string;
  kind: MediaKind;
}
