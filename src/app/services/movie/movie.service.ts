import {inject, Injectable} from '@angular/core';
import {PageableResponse, UserMovieDetails, UserMovieListing} from '../../models/movie.model';
import {HttpClient} from '@angular/common/http';
import {map, Observable, switchMap} from 'rxjs';
import {NetflixApiMovieResponse} from '../../models/netflix-api.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly authService = inject(AuthService);
  private readonly http = inject(HttpClient);

  listPopularMovies(pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    return this.buildUrl(`/popular?page=${this.getPageNumber(pageNumber)}`).pipe(
      switchMap(url => this.fetchMovieListing(url))
    );
  }

  searchMovies(searchTerm: string, pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    return this.buildUrl(`/search?query=${encodeURIComponent(searchTerm)}&page=${this.getPageNumber(pageNumber)}`).pipe(
      switchMap(url => this.fetchMovieListing(url))
    );
  }

  getSimilarMovies(movieId: string): Observable<PageableResponse<UserMovieListing>> {
    return this.buildUrl(`/${movieId}/similar`).pipe(
      switchMap(url => this.fetchMovieListing(url))
    );
  }

  getMovieDetails(movieId: string): Observable<UserMovieDetails> {
    return this.buildUrl(`/${movieId}`).pipe(
      switchMap(url => this.http.get<NetflixApiMovieResponse>(url)),
      map(response => this.parseApiMovieResponse(response))
    );
  }

  private fetchMovieListing(url: string): Observable<PageableResponse<UserMovieListing>> {
    return this.http.get<PageableResponse<NetflixApiMovieResponse>>(url)
      .pipe(
        map(pageableResponse => {
          return {
            ...pageableResponse,
            results: pageableResponse.results.map(movie => this.parseApiMovieResponse(movie))
          }
        })
      );
  }

  private parseApiMovieResponse(movie: NetflixApiMovieResponse): UserMovieDetails {
    return {
      ...movie.movieListing,
      ...movie.movieDetails,
      ...movie.userMovieMetadata
    };
  }

  private getPageNumber(pageNumber: number) {
    return pageNumber - 1; // Adjusting to 0-based index
  }

  private buildUrl(endpoint: string): Observable<string> {
    return this.authService.getCurrentUser().pipe(
      map(user => `/movies/${user.id}${endpoint}`)
    );
  }
}
