import {Component, input} from '@angular/core';
import {NetflixIconComponent} from '../../../../components/netflix-icon/netflix-icon.component';

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
  size = input<string | number>('18px');
}
