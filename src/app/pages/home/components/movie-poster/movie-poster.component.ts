import {Component, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {UserMovieListing} from '../../../../models/movie.model';
import {MoviePosterImageComponent} from '../../../../components/movie-poster-image/movie-poster-image.component';
import {MovieRatingComponent} from '../../../movie-details/components/movie-rating/movie-rating.component';
import {DatePipe} from '@angular/common';
import {MovieOption, MovieOptionsButtonComponent} from '../movie-options-button/movie-options-button.component';
import {AddToPlaylistModalComponent} from '../add-to-playlist-modal/add-to-playlist-modal.component';
import {RouteParams} from '../../../../enums/app-routes';
import {PlaylistService} from '../../../../services/playlist/playlist.service';
import {SystemPlaylistIds} from '../../../../models/playlist.model';

@Component({
  selector: 'netflix-movie-poster',
  imports: [
    RouterLink,
    MoviePosterImageComponent,
    MovieRatingComponent,
    DatePipe,
    MovieOptionsButtonComponent,
    AddToPlaylistModalComponent
  ],
  templateUrl: './movie-poster.component.html',
  styleUrl: './movie-poster.component.css'
})
export class MoviePosterComponent {
  movie = input.required<UserMovieListing>()

  private playlistService = inject(PlaylistService);

  showAddToPlaylistModal: boolean = false;

  get movieOptions(): MovieOption[] {
    const watchLaterLabel = this.movie().isWatchlater ? 'Remove from watch later' : 'Add to watch later';
    const favoriteLabel = this.movie().isFavorite ? 'Remove from favorites' : 'Add to favorites';

    return [
      {
        icon: 'clock',
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
        action: () => this.toggleAddToPlaylistModal()
      }
    ];
  }

  toggleWatchlater() {
    this.playlistService.toggleMovieInPlaylist(SystemPlaylistIds.WatchLater, this.movie().id).subscribe(
      updatedPlaylist => {
        this.movie().isWatchlater = updatedPlaylist.movieIds.includes(this.movie().id);
      }
    );
  }

  toggleFavorites() {
    this.playlistService.toggleMovieInPlaylist(SystemPlaylistIds.Favorites, this.movie().id).subscribe(
      updatedPlaylist => {
        this.movie().isFavorite = updatedPlaylist.movieIds.includes(this.movie().id);
      }
    );
  }

  toggleAddToPlaylistModal() {
    this.showAddToPlaylistModal = !this.showAddToPlaylistModal;
  }

  protected readonly RouteParams = RouteParams;
}
