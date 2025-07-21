import {Component, inject, OnInit} from '@angular/core';
import {UserMovieDetails} from '../../models/movie.model';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MoviePosterImageComponent} from '../../components/movie-poster-image/movie-poster-image.component';
import {UserMovieService} from '../../services/user/user-movie.service';
import {NetflixIconComponent} from '../../components/netflix-icon/netflix-icon.component';
import {NavbarContainerComponent} from '../../components/navbar-container/navbar-container.component';
import {
  LoadingSpinnerIndicatorComponent
} from '../../components/loading-spinner-indicator/loading-spinner-indicator.component';
import {FormsModule} from '@angular/forms';
import {MovieRatingComponent} from './components/movie-rating/movie-rating.component';
import {MovieDetailsTabsComponent} from './components/movie-details-tabs/movie-details-tabs.component';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {SystemPlaylistIds} from '../../models/playlist.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'netflix-movie-details',
  imports: [
    MoviePosterImageComponent,
    DatePipe,
    NetflixIconComponent,
    NavbarContainerComponent,
    LoadingSpinnerIndicatorComponent,
    FormsModule,
    MovieRatingComponent,
    MovieDetailsTabsComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie?: UserMovieDetails;

  private movieService = inject(UserMovieService);
  private activatedRoute = inject(ActivatedRoute);
  private playlistService = inject(PlaylistService);

  isLoading: boolean = true;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.movieService.getMovieDetails(params['id']).subscribe({
        next: (movie) => this.movie = movie,
        complete: () => this.isLoading = false
      });
    });
  }

  toggleMoviePlaylist($event: MouseEvent, playlistId: SystemPlaylistIds, movie: UserMovieDetails, isAlreadyAdded: boolean) {
    $event.stopPropagation();
    $event.preventDefault();

    if (playlistId === SystemPlaylistIds.Favorites) {
      this.toggleMovieInPlaylist(movie.id, playlistId, isAlreadyAdded)
        .subscribe(() => movie.isFavorite = !isAlreadyAdded);
      return;
    }

    if (playlistId === SystemPlaylistIds.WatchLater) {
      this.toggleMovieInPlaylist(movie.id, playlistId, isAlreadyAdded)
        .subscribe(() => movie.isWatchlater = !isAlreadyAdded);
      return;
    }
  }

  private toggleMovieInPlaylist(movieId: string, playlistId: SystemPlaylistIds, isAlreadyAdded: boolean): Observable<void> {
    if (isAlreadyAdded) {
      return this.playlistService.removeMovieFromPlaylists(movieId, [playlistId]);
    } else {
      return this.playlistService.addMovieToPlaylists(movieId, [playlistId]);
    }
  }

  protected readonly SystemPlaylistIds = SystemPlaylistIds;
}
