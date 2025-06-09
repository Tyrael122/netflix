import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserMovieListing} from '../../models/movie.model';
import {MoviePosterImageComponent} from '../movie-poster-image/movie-poster-image.component';
import {MovieRatingComponent} from '../movie-rating/movie-rating.component';
import {DatePipe} from '@angular/common';
import {MovieOptionsButtonComponent} from '../movie-options-button/movie-options-button.component';

@Component({
  selector: 'netflix-movie-poster',
  imports: [
    RouterLink,
    MoviePosterImageComponent,
    MovieRatingComponent,
    DatePipe,
    MovieOptionsButtonComponent
  ],
  templateUrl: './movie-poster.component.html',
  styleUrl: './movie-poster.component.css'
})
export class MoviePosterComponent {
  movie = input.required<UserMovieListing>()
}
