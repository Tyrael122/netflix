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
import {ToastService} from '../../../../services/toast/toast.service';

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
  private toastService = inject(ToastService);

  showAddToPlaylistModal: boolean = false;

  get movieOptions(): MovieOption[] {
    const watchLaterLabel = this.movie().isWatchLater ? 'Remove from watch later' : 'Add to watch later';
    const favoriteLabel = this.movie().isFavorite ? 'Remove from favorites' : 'Add to favorites';

    return [
      {
        icon: 'clock',
        label: watchLaterLabel,
        action: () => this.toggleWatchlater(this.movie().isWatchLater)
      },
      {
        icon: 'favorite',
        label: favoriteLabel,
        action: () => this.toggleFavorites(this.movie().isFavorite)
      },
      {
        icon: 'bookmark',
        label: 'Add to playlist',
        action: () => this.toggleAddToPlaylistModal()
      }
    ];
  }

  toggleWatchlater(isAlreadyInWatchLater: boolean) {
    let movieId = this.movie().id;

    if (isAlreadyInWatchLater) {
      this.playlistService.removeMovieFromPlaylists(movieId, [SystemPlaylistIds.WatchLater]).subscribe(
        () => {
          this.movie().isWatchLater = false;
          this.toastService.showToast("Movie removed from watch later");
        }
      )
    } else {
      this.playlistService.addMovieToPlaylists(movieId, [SystemPlaylistIds.WatchLater]).subscribe(
        () => {
          this.movie().isWatchLater = true;
          this.toastService.showToast("Movie added to watch later");
        }
      )
    }
  }

  toggleFavorites(isAlreadyInFavorites: boolean) {
    if (isAlreadyInFavorites) {
      this.playlistService.removeMovieFromPlaylists(this.movie().id, [SystemPlaylistIds.Favorites]).subscribe(
        () => {
          this.movie().isFavorite = false;
          this.toastService.showToast("Movie removed from favorites");
        }
      );
    } else {
      this.playlistService.addMovieToPlaylists(this.movie().id, [SystemPlaylistIds.Favorites]).subscribe(
        () => {
          this.movie().isFavorite = true;
          this.toastService.showToast("Movie added to favorites");
        }
      );
    }
  }

  toggleAddToPlaylistModal() {
    this.showAddToPlaylistModal = !this.showAddToPlaylistModal;
  }

  protected readonly RouteParams = RouteParams;
}
