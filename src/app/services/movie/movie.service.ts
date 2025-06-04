import {Injectable} from '@angular/core';
import {Movie, PageableResponse} from '../../models/movie.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private headers = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTI5NmE1MGJmNGRiODk2M2JhY2JmODZlM2QyOTMwMyIsIm5iZiI6MTc0ODk0OTQ0MS45NDcsInN1YiI6IjY4M2VkOWMxZWQ1OTU0NzM4ZGYyYmFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rOT4FeOukmjES8Y1QwM8SQsxLvVjtcFPbDmrin8Ebdg',
    'accept': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  listPopularMovies(pageNumber: number): Observable<PageableResponse<Movie>> {
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}`;
    return this.http.get<PageableResponse<Movie>>(url, {headers: this.headers})
      .pipe(
        // map the poster_url to include the base URL
        map(pageableResponse => ({
          ...pageableResponse,
          results: pageableResponse.results.map(movie => ({
            ...movie,
            poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : undefined
          }))
        }))
      );
  }

  getMovieDetails(movieId: string): Observable<Movie> {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

    return this.http.get<Movie>(url, {headers: this.headers})
      .pipe(
        map(movie => ({
          ...movie,
          poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : undefined
        }))
      );
  }
}
