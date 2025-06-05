export interface PageableResponse<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}

export interface MovieListing {
  id: string;
  title: string;
  poster_path?: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
}

export interface MovieDetails extends MovieListing {
  runtime: number;
  original_language: string;
  tagline?: string;
  homepage?: string;
  status?: string;
  production_companies?: { id: number; name: string; logo_path?: string; origin_country: string }[];
  spoken_languages?: { iso_639_1: string; name: string }[];
  credits?: {
    cast: { id: number; name: string; character: string; profile_path?: string }[];
    crew: { id: number; name: string; job: string; profile_path?: string }[];
  };
}

export interface UserMovieMetadata {
  isFavorite: boolean;
  isWatchlist: boolean;
  isWatched: boolean;
}

export type UserMovieListing = MovieListing & UserMovieMetadata;
export type UserMovieDetails =  MovieDetails & UserMovieMetadata;
