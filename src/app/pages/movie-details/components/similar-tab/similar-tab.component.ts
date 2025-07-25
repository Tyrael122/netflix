import {Component, effect, inject, input} from '@angular/core';
import {MoviePosterImageComponent} from '../../../../components/movie-poster-image/movie-poster-image.component';
import {MovieListing} from '../../../../models/movie.model';
import {UserMovieService} from '../../../../services/user/user-movie.service';
import {RouterLink} from '@angular/router';
import {RouteParams} from '../../../../enums/app-routes';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'netflix-similar-tab',
  imports: [
    MoviePosterImageComponent,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './similar-tab.component.html',
  styleUrl: './similar-tab.component.css'
})
export class SimilarTabComponent {
  movie = input.required<MovieListing>();

  similarMovies: MovieListing[] = [];

  private moviesService = inject(UserMovieService);

  constructor() {
    effect(() => {
      this.fetchSimilarMovies(this.movie().id);
    });
  }

  get canSeeSimilarMovies(): Observable<boolean> {
    return this.moviesService.hasPermissionToSeeSimilarMovies();
  }

  private fetchSimilarMovies(movieId: string) {
    this.moviesService.getSimilarMovies(movieId).subscribe(
      (pageableResponse) => this.similarMovies = pageableResponse.results,
    );
  }

  protected readonly RouteParams = RouteParams;
}
