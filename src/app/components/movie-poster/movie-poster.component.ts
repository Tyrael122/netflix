import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserMovieListing} from '../../models/movie.model';
import {FavoriteButtonComponent} from '../favorite-button/favorite-button.component';
import {MoviePosterImageComponent} from '../movie-poster-image/movie-poster-image.component';
import {MovieRatingComponent} from '../../pages/movie-details/movie-rating/movie-rating.component';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'netflix-movie-poster',
  imports: [
    RouterLink,
    FavoriteButtonComponent,
    MoviePosterImageComponent,
    MovieRatingComponent,
    DatePipe
  ],
  templateUrl: './movie-poster.component.html',
  styleUrl: './movie-poster.component.css'
})
export class MoviePosterComponent {
  movie = input.required<UserMovieListing>()
}
