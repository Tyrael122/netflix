import {MovieDetails, MovieListing, UserMovieMetadata} from './movie.model';

export interface NetflixApiMovieResponse {
  movieListing: MovieListing;
  movieDetails: MovieDetails;
  userMovieMetadata: UserMovieMetadata;
}
