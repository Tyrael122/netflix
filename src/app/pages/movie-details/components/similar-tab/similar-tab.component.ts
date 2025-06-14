import {Component, effect, inject, input, OnInit} from '@angular/core';
import {MoviePosterImageComponent} from '../../../../components/movie-poster-image/movie-poster-image.component';
import {MovieListing} from '../../../../models/movie.model';
import {MovieService} from '../../../../services/movie/movie.service';
import {UserMovieService} from '../../../../services/user/user-movie.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'netflix-similar-tab',
  imports: [
    MoviePosterImageComponent
  ],
  templateUrl: './similar-tab.component.html',
  styleUrl: './similar-tab.component.css'
})
export class SimilarTabComponent {
  movie = input.required<MovieListing>();

  similarMovies: MovieListing[] = [];

  private moviesService = inject(UserMovieService);
  private router = inject(Router);

  constructor() {
    effect(() => {
      this.fetchSimilarMovies(this.movie().id);
    });
  }

  navigateToMovie(id: string) {
    this.router.navigate(['/movie', id])
      .catch(err => {
        console.error('Navigation error:', err);
      });
  }

  private fetchSimilarMovies(movieId: string) {
    this.moviesService.getSimilarMovies(movieId).subscribe({
      next: (movies) => this.similarMovies = movies,
      error: (err) => console.error('Error fetching similar movies:', err)
    });
  }
}
