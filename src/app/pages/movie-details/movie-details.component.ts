import {Component, inject} from '@angular/core';
import {UserMovie} from '../../models/movie.model';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MoviePosterImageComponent} from '../../components/movie-poster-image/movie-poster-image.component';
import {UserMovieService} from '../../services/user/user-movie.service';
import {FavoriteButtonComponent} from '../../components/favorite-button/favorite-button.component';

@Component({
  selector: 'netflix-movie-details',
  imports: [
    MoviePosterImageComponent,
    DatePipe,
    FavoriteButtonComponent
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movie?: UserMovie;

  private movieService = inject(UserMovieService);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.movieService.getMovieDetails(params['id']).subscribe((movie) => {
        this.movie = movie;
        console.log(this.movie);
      });
    });
  }
}
