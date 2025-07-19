import {inject, Injectable} from '@angular/core';
import {
  MovieDetails,
  MovieListing,
  PageableResponse,
  UserMovieDetails,
  UserMovieListing
} from '../../models/movie.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable, throwError} from 'rxjs';
import {NetflixApiMovieResponse} from '../../models/netflix-api.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http = inject(HttpClient);

  listPopularMovies(pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    const url = `/movies/popular?page=${pageNumber}`;
    return this.fetchMovieListing(url);
  }

  searchMovies(searchTerm: string, pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    const url = `/movies/search?query=${encodeURIComponent(searchTerm)}&page=${pageNumber}`;
    return this.fetchMovieListing(url);
  }

  getSimilarMovies(movieId: string): Observable<PageableResponse<UserMovieListing>> {
    const url = `/movies/${movieId}/similar`;
    return this.fetchMovieListing(url);
  }

  getMovieDetails(movieId: string): Observable<UserMovieDetails> {
    const url = `/movies/${movieId}`;
    return this.http.get<NetflixApiMovieResponse>(url).pipe(
      map(response => this.parseApiMovieResponse(response))
    );
  }

  private fetchMovieListing(url: string): Observable<PageableResponse<UserMovieListing>> {
    return this.http.get<PageableResponse<NetflixApiMovieResponse>>(url)
      .pipe(
        map(pageableResponse => ({
          ...pageableResponse,
          results: pageableResponse.results.map(movie => this.parseApiMovieResponse(movie))
        }))
      );
  }

  private parseApiMovieResponse(movie: NetflixApiMovieResponse): UserMovieDetails {
    return {
      ...movie.movie_listing,
      ...movie.movie_details,
      ...movie.user_movie_metadata
    };
  }
}
