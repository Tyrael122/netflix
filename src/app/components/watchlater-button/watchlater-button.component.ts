import {Component, inject, Input, input} from '@angular/core';
import {NetflixIconComponent} from "../netflix-icon/netflix-icon.component";
import {UserMovieListing} from '../../models/movie.model';
import {WatchlaterService} from '../../services/watchlater/watchlater.service';

@Component({
  selector: 'netflix-watchlater-button',
  imports: [
    NetflixIconComponent
  ],
  templateUrl: './watchlater-button.component.html',
  styleUrl: './watchlater-button.component.css'
})
export class WatchlaterButtonComponent {
  movie = input.required<UserMovieListing>();
  @Input() alwaysShow: boolean = false;

  private watchlaterService = inject(WatchlaterService);

  onClick(event: MouseEvent) {
    event.stopPropagation(); // Prevent the click from propagating to the poster link
    event.preventDefault(); // Prevent default action if needed

    const movie = this.movie();
    movie.isWatchlater = this.watchlaterService.toggleWatchlater(movie.id);
  }
}
