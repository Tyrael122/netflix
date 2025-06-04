export interface PageableResponse<T> {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
}

export interface Movie {
  id: string;
  title: string;
  poster_path?: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genres?: { id: number; name: string }[];
}

export interface UserMovie extends Movie {
  isFavorite: boolean;
  isWatchlist: boolean;
  isWatched: boolean;
}
