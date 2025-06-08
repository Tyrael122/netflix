import {inject, Injectable} from '@angular/core';
import {
  MovieListing,
  PageableResponse,
  UserMovieDetails,
  UserMovieListing,
  UserMovieMetadata
} from '../../models/movie.model';
import {MovieService} from '../movie/movie.service';
import {FavoritesService} from '../favorites/favorites.service';
import {from, map, mergeMap, Observable, toArray} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserMovieService {
  private movieService = inject(MovieService);
  private favoritesService = inject(FavoritesService);

  getPopularMovies(pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    return this.movieService.listPopularMovies(pageNumber).pipe(
      // Map the response to convert Movie to UserMovie
      map(pageableResponse => {
        const userMovies: UserMovieListing[] = pageableResponse.results.map(
          movie => this.enrichMovieWithUserMetadata(movie)
        );

        return {
          ...pageableResponse,
          results: userMovies
        };
      })
    )
  }

  searchMovies(searchTerm: string, pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    return this.movieService.searchMovies(searchTerm, pageNumber).pipe(
      map(pageableResponse => {
        const userMovies: UserMovieListing[] = pageableResponse.results.map(
          movie => this.enrichMovieWithUserMetadata(movie)
        );

        return {
          ...pageableResponse,
          results: userMovies
        };
      })
    );
  }

  getFavoriteMovies(): Observable<UserMovieDetails[]> {
    return from(this.favoritesService.getFavorites()).pipe(
      mergeMap(movieId =>
        this.movieService.getMovieDetails(movieId).pipe(
          map(movie => this.enrichMovieWithUserMetadata(movie))
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

  getMovieDetails(id: string): Observable<UserMovieDetails> {
    return this.movieService.getMovieDetails(id).pipe(
      map(movie => this.enrichMovieWithUserMetadata(movie))
    );
  }

  private enrichMovieWithUserMetadata<T extends MovieListing>(movie: T) {
    return {
      ...movie,
      ...this.getUserMovieMetadata(movie)
    }
  }

  private getUserMovieMetadata(movie: MovieListing): UserMovieMetadata {
    return {
      isFavorite: this.favoritesService.isFavorite(movie.id),
      isWatchlist: false, // Placeholder, implement watchlist logic if needed
      isWatched: false // Placeholder, implement watched logic if needed
    };
  }
}
