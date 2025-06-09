import {Component, input, Input, signal} from '@angular/core';
import {NetflixIconComponent} from '../netflix-icon/netflix-icon.component';

@Component({
  selector: 'netflix-movie-rating',
  imports: [
    NetflixIconComponent
  ],
  templateUrl: './movie-rating.component.html',
  styleUrl: './movie-rating.component.css'
})
export class MovieRatingComponent {
  vote_average = input.required<number>()
  size = input<string | number>('20px');
}
