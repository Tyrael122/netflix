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
  private plansService = inject(PlansService);

  getPopularMovies(pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    return this.movieService.listPopularMovies(pageNumber);
  }

  searchMovies(searchTerm: string, pageNumber: number): Observable<PageableResponse<UserMovieListing>> {
    return this.movieService.searchMovies(searchTerm, pageNumber);
  }

  getSimilarMovies(id: string): Observable<PageableResponse<UserMovieListing>> {
    return this.movieService.getSimilarMovies(id);
  }

  getMovieDetails(id: string): Observable<UserMovieDetails> {
    return this.movieService.getMovieDetails(id);
  }

  hasPermissionToSeeSimilarMovies(): boolean {
    return this.plansService.getCurrentUserPlanDetails().features.canSeeSimilarMovies;
  }
}
