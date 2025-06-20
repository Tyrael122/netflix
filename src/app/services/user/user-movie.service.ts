import {inject, Injectable} from '@angular/core';
import {
  MovieListing,
  PageableResponse,
  UserMovieDetails,
  UserMovieListing,
  UserMovieMetadata
} from '../../models/movie.model';
import {MovieService} from '../movie/movie.service';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import {PlansService} from '../plans/plans.service';
import {PlaylistService} from '../playlist/playlist.service';
import {SystemPlaylistIds} from '../../models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class UserMovieService {
  private movieService = inject(MovieService);
  private playlistService = inject(PlaylistService);
  private plansService = inject(PlansService);

  getPopularMovies(pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    return this.movieService.listPopularMovies(pageNumber).pipe(
      switchMap(pageableResponse => this.enrichMovieListingWithUserMetadata(pageableResponse))
    )
  }

  searchMovies(searchTerm: string, pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    return this.movieService.searchMovies(searchTerm, pageNumber).pipe(
      switchMap(pageableResponse => this.enrichMovieListingWithUserMetadata(pageableResponse))
    );
  }

  getSimilarMovies(id: string): Observable<PageableResponse<UserMovieListing>> {
    return this.movieService.getSimilarMovies(id).pipe(
      switchMap(pageableResponse => this.enrichMovieListingWithUserMetadata(pageableResponse))
    );
  }

  getMovieDetails(id: string): Observable<UserMovieDetails> {
    return this.movieService.getMovieDetails(id).pipe(
      switchMap(movie => this.enrichMovieWithUserMetadata(movie))
    );
  }

  hasPermissionToSeeSimilarMovies(): boolean {
    return this.plansService.getCurrentUserPlanDetails().features.canSeeSimilarMovies;
  }

  private enrichMovieListingWithUserMetadata(pageableResponse: PageableResponse<MovieListing>): Observable<PageableResponse<UserMovieListing>> {
    const userMovies = pageableResponse.results.map(
      movie => this.enrichMovieWithUserMetadata(movie)
    );

    return forkJoin(
      userMovies
    ).pipe(
      map(enrichedMovies => ({
        ...pageableResponse,
        results: enrichedMovies
      }))
    )
  }

  private enrichMovieWithUserMetadata<T extends MovieListing>(movie: T): Observable<T & UserMovieMetadata> {
    return this.getUserMovieMetadata(movie).pipe(
      map(metadata => ({
        ...movie,
        ...metadata
      }))
    );
  }

  private getUserMovieMetadata(movie: MovieListing): Observable<UserMovieMetadata> {
    return this.playlistService.getMoviePlaylists(movie.id).pipe(
      map(playlists => {
        const isFavorite = playlists.some(playlist => playlist.id === SystemPlaylistIds.Favorites);
        const isWatchlater = playlists.some(playlist => playlist.id === SystemPlaylistIds.WatchLater);

        return {
          isFavorite,
          isWatchlater,
          isWatched: false // Assuming watched status is not tracked in this service
        };
      })
    )
  }
}
