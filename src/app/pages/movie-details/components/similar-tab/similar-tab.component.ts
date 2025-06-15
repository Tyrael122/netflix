import {Component, effect, inject, input} from '@angular/core';
import {MoviePosterImageComponent} from '../../../../components/movie-poster-image/movie-poster-image.component';
import {MovieListing} from '../../../../models/movie.model';
import {UserMovieService} from '../../../../services/user/user-movie.service';
import {RouterLink} from '@angular/router';
import {RouteParams} from '../../../../enums/app-routes';

@Component({
  selector: 'netflix-similar-tab',
  imports: [
    MoviePosterImageComponent,
    RouterLink
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

  private fetchSimilarMovies(movieId: string) {
    this.moviesService.getSimilarMovies(movieId).subscribe({
      next: (movies) => this.similarMovies = movies,
      error: (err) => console.error('Error fetching similar movies:', err)
    });
  }

  protected readonly RouteParams = RouteParams;
}
