import {Component, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserMovieListing} from '../../../../models/movie.model';
import {MoviePosterImageComponent} from '../../../../components/movie-poster-image/movie-poster-image.component';
import {MovieRatingComponent} from '../../../movie-details/components/movie-rating/movie-rating.component';
import {DatePipe} from '@angular/common';
import {MovieOption, MovieOptionsButtonComponent} from '../movie-options-button/movie-options-button.component';
import {FavoritesService} from '../../../../services/favorites/favorites.service';
import {WatchlaterService} from '../../../../services/watchlater/watchlater.service';

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

  favoritesService = inject(FavoritesService);
  watchlaterService = inject(WatchlaterService);

  get movieOptions(): MovieOption[] {
    const watchLaterLabel = this.movie().isWatchlater ? 'Remove from watch later' : 'Add to watch later';
    const favoriteLabel = this.movie().isFavorite ? 'Remove from favorites' : 'Add to favorites';

    return [
      {
        icon: 'watch-later',
        label: watchLaterLabel,
        action: () => this.toggleWatchlater()
      },
      {
        icon: 'favorite',
        label: favoriteLabel,
        action: () => this.toggleFavorites()
      },
      {
        icon: 'bookmark',
        label: 'Add to playlist',
        action: () => this.addToPlaylist()
      }
    ];
  }

  toggleWatchlater() {
    this.movie().isWatchlater = this.watchlaterService.toggleWatchlater(this.movie().id);
  }

  toggleFavorites() {
    this.movie().isFavorite = this.favoritesService.toggleFavorite(this.movie().id);
  }

  addToPlaylist() {
    console.log('Add to playlist clicked');
  }
}
