import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserMovieListing} from '../../models/movie.model';
import {FavoriteButtonComponent} from '../favorite-button/favorite-button.component';
import {MoviePosterImageComponent} from '../movie-poster-image/movie-poster-image.component';

@Component({
  selector: 'netflix-movie-poster',
  imports: [
    RouterLink,
    FavoriteButtonComponent,
    MoviePosterImageComponent
  ],
  templateUrl: './movie-poster.component.html',
  styleUrl: './movie-poster.component.css'
})
export class MoviePosterComponent {
  movie = input.required<UserMovieListing>()



}
