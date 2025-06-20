import {Component, inject, OnInit} from '@angular/core';
import {MoviePosterImageComponent} from "../../components/movie-poster-image/movie-poster-image.component";
import {NavbarContainerComponent} from "../../components/navbar-container/navbar-container.component";
import {NetflixIconComponent} from "../../components/netflix-icon/netflix-icon.component";
import {ActivatedRoute, RouterLink} from '@angular/router';
import {UserMovieListing} from '../../models/movie.model';
import {UserMovieService} from '../../services/user/user-movie.service';
import {AuthService} from '../../services/auth/auth.service';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {AppRoutes, RouteParams} from '../../enums/app-routes';
import {
  LoadingSpinnerIndicatorComponent
} from '../../components/loading-spinner-indicator/loading-spinner-indicator.component';
import {Playlist} from '../../models/playlist.model';

@Component({
  selector: 'netflix-playlist-details',
  imports: [
    MoviePosterImageComponent,
    NavbarContainerComponent,
    NetflixIconComponent,
    RouterLink,
    LoadingSpinnerIndicatorComponent
  ],
  templateUrl: './playlist-details.component.html',
  styleUrl: './playlist-details.component.css'
})
export class PlaylistDetailsComponent implements OnInit {
  playlist?: Playlist;

  playlistMovies: UserMovieListing[] = [];
  isLoading: boolean = true;

  private userMovieService = inject(UserMovieService);
  private playlistService = inject(PlaylistService);
  protected authService = inject(AuthService);

  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.isLoading = true;

      const playlistId = params['id'];
      this.fetchPlaylistData(playlistId);
    })
  }

  private fetchPlaylistData(playlistId: string | null) {
    if (playlistId) {
      this.playlistService.getPlaylistById(playlistId).subscribe(playlist => {
        this.playlist = playlist;

        if (playlist) {
          this.loadPlaylistMovies(playlist.movieIds);
        }
      });
    }
  }

  removeFromPlaylist(id: string, $event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    if (!this.playlist) {
      return;
    }

    this.playlistService.toggleMovieInPlaylist(this.playlist.id, id).subscribe((updatedPlaylist) => {
      this.playlist = updatedPlaylist;
      this.playlistMovies = this.playlistMovies.filter(movie => movie.id !== id);
    });
  }

  private loadPlaylistMovies(movieIds: string[]) {
    if (!movieIds || movieIds.length === 0) {
      this.isLoading = false;
      return;
    }

    this.playlistMovies = [];

    for (let i = 0; i < movieIds.length; i++) {
      this.userMovieService.getMovieDetails(movieIds[i]).subscribe(m => {
        this.playlistMovies.push(m);
        this.isLoading = false;
      });
    }
  }

  protected readonly RouteParams = RouteParams;
  protected readonly AppRoutes = AppRoutes;
}
