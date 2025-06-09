import {Component, input} from '@angular/core';
import {NetflixIconComponent} from '../netflix-icon/netflix-icon.component';
import {UserMovieListing} from '../../models/movie.model';
import {SingleDropdownOpenDirective} from '../../directives/single-dropdown-open.directive';

export interface MovieOption {
  icon: string;
  label: string;
  action?: () => void;
}

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
  size = input<string | number>('20px')
  options = input.required<MovieOption[]>()

  triggerAction(action: (() => void) | undefined) {
    if (action) {
      action();
    }
  }
}
