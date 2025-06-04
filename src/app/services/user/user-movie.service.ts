import {inject, Injectable} from '@angular/core';
import {Movie, PageableResponse, UserMovie} from '../../models/movie.model';
import {MovieService} from '../movie/movie.service';
import {FavoritesService} from '../favorites/favorites.service';
import {from, map, mergeMap, Observable, toArray} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMovieService {
  private movieService = inject(MovieService);
  private favoritesService = inject(FavoritesService);

  getPopularMovies(pageNumber: number): Observable<PageableResponse<UserMovie>> {
    return this.movieService.listPopularMovies(pageNumber).pipe(
      // Map the response to convert Movie to UserMovie
      map(pageableResponse => {
        const userMovies: UserMovie[] = pageableResponse.results.map(
          movie => this.enrichMovieDataWithUserMetadata(movie)
        );

        return {
          ...pageableResponse,
          results: userMovies
        };
      })
    )
  }

  getFavoriteMovies(): Observable<UserMovie[]> {
    return from(this.favoritesService.getFavorites()).pipe(
      mergeMap(movieId =>
        this.movieService.getMovieDetails(movieId).pipe(
          map(movie => this.enrichMovieDataWithUserMetadata(movie))
        )
      ),
      toArray() // Collect all emissions into a single array
    );
  }

  removeFromFavorites(id: string): Observable<void> {
    return new Observable<void>(subscriber => {
      this.favoritesService.removeFavorite(id);
      subscriber.next();
      subscriber.complete();
    });
  }

  addToFavorites(id: string): Observable<void> {
    return new Observable<void>(subscriber => {
      this.favoritesService.addFavorite(id);
      subscriber.next();
      subscriber.complete();
    });
  }

  getMovieDetails(id: string): Observable<UserMovie> {
    return this.movieService.getMovieDetails(id).pipe(
      map(movie => this.enrichMovieDataWithUserMetadata(movie))
    );
  }

  private enrichMovieDataWithUserMetadata(movie: Movie): UserMovie {
    return {
      ...movie,
      isFavorite: this.favoritesService.isFavorite(movie.id),
      isWatchlist: false, // Placeholder, implement watchlist logic if needed
      isWatched: false // Placeholder, implement watched logic if needed
    }
  };
}
