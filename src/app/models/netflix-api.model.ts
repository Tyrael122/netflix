import {MovieDetails, MovieListing, UserMovieMetadata} from './movie.model';

export interface NetflixApiMovieResponse {
  movie_listing: MovieListing;
  movie_details: MovieDetails;
  user_movie_metadata: UserMovieMetadata;
}
