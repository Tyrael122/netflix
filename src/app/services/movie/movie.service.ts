import {inject, Injectable} from '@angular/core';
import {MovieDetails, MovieListing, PageableResponse} from '../../models/movie.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private http = inject(HttpClient);

  private headers = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTI5NmE1MGJmNGRiODk2M2JhY2JmODZlM2QyOTMwMyIsIm5iZiI6MTc0ODk0OTQ0MS45NDcsInN1YiI6IjY4M2VkOWMxZWQ1OTU0NzM4ZGYyYmFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rOT4FeOukmjES8Y1QwM8SQsxLvVjtcFPbDmrin8Ebdg',
    'accept': 'application/json'
  });

  listPopularMovies(pageNumber: number): Observable<PageableResponse<MovieListing>> {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}`;
    return this.fetchMovieListing(url);
  }

  searchMovies(searchTerm: string, pageNumber: number): Observable<PageableResponse<MovieListing>> {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}&language=en-US&page=${pageNumber}&include_adult=false`;
    return this.fetchMovieListing(url);
  }

  getSimilarMovies(movieId: string) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`;
    return this.fetchMovieListing(url);
  }

  getMovieDetails(movieId: string): Observable<MovieDetails> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

    return this.http.get<MovieDetails>(url, {headers: this.headers})
      .pipe(
        map(movie => this.parseMovieListing(movie, 'original'))
      );
  }

  private fetchMovieListing(url: string): Observable<PageableResponse<MovieListing>> {
    return this.http.get<PageableResponse<MovieListing>>(url, {headers: this.headers})
      .pipe(
        map(pageableResponse => ({
          ...pageableResponse,
          results: pageableResponse.results.map(movie => this.parseMovieListing(movie))
        }))
      );
  }

  private parseMovieListing<T extends MovieListing>(movie: T, posterResolution: string = 'w500'): T {
    return {
      ...movie,
      poster_path: this.parsePosterPath(movie.poster_path, posterResolution)
    };
  }

  private parsePosterPath(posterPath: string | undefined, resolution: string): string | undefined {
    return posterPath ? `https://image.tmdb.org/t/p/${resolution}${posterPath}` : undefined;
  }
}
