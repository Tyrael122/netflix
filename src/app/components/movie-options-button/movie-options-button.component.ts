import {Component, input} from '@angular/core';
import {NetflixIconComponent} from '../netflix-icon/netflix-icon.component';
import {UserMovieListing} from '../../models/movie.model';
import {SingleDropdownOpenDirective} from '../../directives/single-dropdown-open.directive';

@Component({
  selector: 'netflix-movie-options-button',
  imports: [
    NetflixIconComponent,
    SingleDropdownOpenDirective
  ],
  templateUrl: './movie-options-button.component.html',
  styleUrl: './movie-options-button.component.css'
})
export class MovieOptionsButtonComponent {
  movie = input.required<UserMovieListing>()
  size = input<string | number>('20px')
}
