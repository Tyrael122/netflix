import {Component, input} from '@angular/core';
import {NetflixIconComponent} from '../netflix-icon/netflix-icon.component';

@Component({
  selector: 'netflix-movie-options-button',
  imports: [
    NetflixIconComponent
  ],
  templateUrl: './movie-options-button.component.html',
  styleUrl: './movie-options-button.component.css'
})
export class MovieOptionsButtonComponent {
  size = input<string | number>('20px')

  openMenu($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
  }
}
