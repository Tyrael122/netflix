import {inject, Injectable} from '@angular/core';
import {
  PageableResponse,
  UserMovieDetails,
  UserMovieListing
} from '../../models/movie.model';
import {MovieService} from '../movie/movie.service';
import {Observable} from 'rxjs';
import {PlansService} from '../plans/plans.service';

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
