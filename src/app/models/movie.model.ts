export interface PageableResponse<T> {
  page: number;
  totalPages: number;
  totalResults: number;
  results: T[];
}

export interface MovieListing {
  id: string;
  title: string;
  posterPath?: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  genres?: { id: number; name: string }[];
}

export interface MovieDetails extends MovieListing {
  runtime: number;
  originalLanguage: string;
  tagline?: string;
  homepage?: string;
  status?: string;
  productionCompanies?: { id: number; name: string; logoPath?: string; originCountry: string }[];
  spokenLanguages?: { iso6391: string; name: string }[];
  credits?: {
    cast: { id: number; name: string; character: string; profilePath?: string }[];
    crew: { id: number; name: string; job: string; profilePath?: string }[];
  };
}

export interface UserMovieMetadata {
  isFavorite: boolean;
  isWatchLater: boolean;
  isWatched: boolean;
}

export type UserMovieListing = MovieListing & UserMovieMetadata;
export type UserMovieDetails = MovieDetails & UserMovieMetadata;
