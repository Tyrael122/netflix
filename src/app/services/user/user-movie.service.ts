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
import {map, Observable} from 'rxjs';
import {PlansService} from '../plans/plans.service';

@Injectable({
  providedIn: 'root'
})
export class UserMovieService {
  private movieService = inject(MovieService);
  private favoritesService = inject(FavoritesService);
  private plansService = inject(PlansService);

  getPopularMovies(pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    return this.movieService.listPopularMovies(pageNumber).pipe(
      map(pageableResponse => this.enrichMovieListingWithUserMetadata(pageableResponse))
    )
  }

  searchMovies(searchTerm: string, pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    return this.movieService.searchMovies(searchTerm, pageNumber).pipe(
      map(pageableResponse => this.enrichMovieListingWithUserMetadata(pageableResponse))
    );
  }

  getSimilarMovies(id: string): Observable<PageableResponse<UserMovieListing>> {
    return this.movieService.getSimilarMovies(id).pipe(
      map(pageableResponse => this.enrichMovieListingWithUserMetadata(pageableResponse))
    );
  }

  getMovieDetails(id: string): Observable<UserMovieDetails> {
    return this.movieService.getMovieDetails(id).pipe(
      map(movie => this.enrichMovieWithUserMetadata(movie))
    );
  }

  hasPermissionToSeeSimilarMovies(): boolean {
    return this.plansService.getCurrentUserPlanDetails().features.canSeeSimilarMovies;
  }

  private enrichMovieListingWithUserMetadata(pageableResponse: PageableResponse<MovieListing>): PageableResponse<UserMovieListing> {
    const userMovies = pageableResponse.results.map(
      movie => this.enrichMovieWithUserMetadata(movie)
    );

    return {
      ...pageableResponse,
      results: userMovies
    };
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
      isWatchlater: false, // Placeholder, implement watchlist logic if needed
      isWatched: false // Placeholder, implement watched logic if needed
    };
  }
}
