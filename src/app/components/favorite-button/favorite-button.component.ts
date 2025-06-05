import {Component, inject, input} from '@angular/core';
import {UserMovieListing} from '../../models/movie.model';
import {UserMovieService} from '../../services/user/user-movie.service';
import {NetflixIconComponent} from '../netflix-icon/netflix-icon.component';

@Component({
  selector: 'netflix-favorite-button',
  imports: [
    NetflixIconComponent
  ],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.css'
})
export class FavoriteButtonComponent {
  movie = input.required<UserMovieListing>();
  private userMovieService = inject(UserMovieService);

  onClick($event: MouseEvent) {
    $event.stopPropagation(); // Prevent the click from propagating to the poster link
    $event.preventDefault(); // Prevent default action if needed

    const movie = this.movie();
    if (movie.isFavorite) {
      this.userMovieService.removeFromFavorites(movie.id).subscribe(() => {
        movie.isFavorite = false;
      });
    } else {
      this.userMovieService.addToFavorites(movie.id).subscribe(() => {
        movie.isFavorite = true;
      });
    }
  }
}
