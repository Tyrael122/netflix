import {inject, Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {MovieListing} from '../../models/movie.model';
import {MovieService} from '../movie/movie.service';
import {PlansService} from '../plans/plans.service';
import {NetflixError, NetflixErrorCodes} from '../../models/errors.model';
import {Playlist, SYSTEM_PLAYLISTS} from '../../models/playlist.model';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private readonly playlists = new Map<string, Playlist[]>(); // userId -> playlists
  private readonly authService = inject(AuthService);
  private readonly movieService = inject(MovieService);
  private readonly plansService = inject(PlansService);

  getPlaylists(): Observable<Playlist[]> {
    return of(this.getCurrentUserPlaylists());
  }

  getPlaylistById(playlistId: string): Observable<Playlist | undefined> {
    const playlist = this.findPlaylistById(playlistId);
    return of(playlist);
  }

  getMoviePlaylists(movieId: string): Observable<Playlist[]> {
    const playlists = this.getCurrentUserPlaylists().filter(playlist =>
      playlist.movieIds.includes(movieId)
    );

    return of(playlists);
  }

  toggleMovieInPlaylist(playlistId: string, movieId: string): Observable<Playlist> {
    const playlist = this.findPlaylistById(playlistId);

    if (!playlist) {
      return this.throwPlaylistNotFoundError();
    }

    return playlist.movieIds.includes(movieId)
      ? this.removeMovieFromPlaylist(playlist, movieId)
      : this.addMovieToPlaylist(playlist, movieId);
  }

  updateMoviePlaylists(movieId: string, newPlaylistIds: string[]): void {
    const playlists = this.getCurrentUserPlaylists();

    playlists.forEach(playlist => {
      const hasMovie = playlist.movieIds.includes(movieId);
      const shouldHaveMovie = newPlaylistIds.includes(playlist.id);

      if (hasMovie && !shouldHaveMovie) {
        this.removeMovieFromPlaylist(playlist, movieId);
      } else if (!hasMovie && shouldHaveMovie) {
        this.addMovieToPlaylist(playlist, movieId);
      }
    });
  }

  createPlaylist(name: string, movie?: MovieListing): Observable<Playlist> {
    return this.validatePlaylistCreationLimit().pipe(() => {
      const newPlaylist = this.createNewPlaylist(name, movie);
      this.getCurrentUserPlaylists().push(newPlaylist);
      return of(newPlaylist);
    });
  }

  validatePlaylistCreationLimit(): Observable<boolean> {
    const limit = this.plansService.getCurrentUserPlanDetails().features.playlistCreation.limit;
    const currentCustomPlaylists = this.getCustomPlaylists();

    if (limit === 0) {
      return this.throwPlaylistCreationError(
        'You cannot create playlists with your current plan. Please upgrade your plan to create playlists.'
      );
    }

    if (currentCustomPlaylists.length >= limit) {
      return this.throwPlaylistCreationError(
        `You have reached the limit of ${limit} custom playlists for your current plan. Please upgrade your plan to create more playlists.`
      );
    }

    return of(true);
  }

  private findPlaylistById(playlistId: string): Playlist | undefined {
    return this.getCurrentUserPlaylists().find(pl => pl.id === playlistId);
  }

  private removeMovieFromPlaylist(playlist: Playlist, movieId: string): Observable<Playlist> {
    playlist.movieIds = playlist.movieIds.filter(id => id !== movieId);
    this.updatePlaylistCoverImage(playlist);
    return of(playlist);
  }

  private addMovieToPlaylist(playlist: Playlist, movieId: string): Observable<Playlist> {
    playlist.movieIds.push(movieId);
    this.updatePlaylistCoverImage(playlist);
    return of(playlist);
  }

  private createNewPlaylist(name: string, movie?: MovieListing): Playlist {
    return {
      id: this.generateUniqueId(),
      name: name.trim(),
      movieIds: movie?.id ? [movie.id] : [],
      isSystemPlaylist: false,
      coverImageUrl: movie?.poster_path
    };
  }

  private getCustomPlaylists(): Playlist[] {
    return this.getCurrentUserPlaylists().filter(playlist => !playlist.isSystemPlaylist);
  }

  private getCurrentUserPlaylists(): Playlist[] {
    const userId = this.authService.getCurrentUser().id;

    if (!this.playlists.has(userId)) {
      this.playlists.set(userId, this.createSystemPlaylists());
    }

    return this.playlists.get(userId)!;
  }

  private updatePlaylistCoverImage(playlist: Playlist): void {
    if (playlist.movieIds.length === 0) {
      playlist.coverImageUrl = undefined;
      return;
    }

    const lastMovieId = playlist.movieIds[playlist.movieIds.length - 1];
    this.movieService.getMovieDetails(lastMovieId).subscribe(movie => {
      playlist.coverImageUrl = movie.poster_path ?? undefined;
    });
  }

  private createSystemPlaylists(): Playlist[] {
    return [...SYSTEM_PLAYLISTS];
  }

  private generateUniqueId(): string {
    return crypto.randomUUID();
  }

  private throwPlaylistNotFoundError(): Observable<never> {
    return throwError((): NetflixError => ({
      code: NetflixErrorCodes.PLAYLIST_NOT_FOUND,
      message: 'There was an error while trying to toggle movie in playlist.'
    }));
  }

  private throwPlaylistCreationError(message: string): Observable<never> {
    return throwError((): NetflixError => ({
      code: NetflixErrorCodes.PLAYLIST_CREATION_LIMIT_REACHED,
      message
    }));
  }
}
