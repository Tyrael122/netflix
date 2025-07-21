import {inject, Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {MovieListing} from '../../models/movie.model';
import {PlansService} from '../plans/plans.service';
import {NetflixError, NetflixErrorCodes} from '../../models/errors.model';
import {Playlist, SYSTEM_PLAYLISTS} from '../../models/playlist.model';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private readonly playlists = new Map<string, Playlist[]>(); // userId -> playlists
  private readonly authService = inject(AuthService);
  private readonly plansService = inject(PlansService);

  private readonly http = inject(HttpClient);

  getPlaylists(): Observable<Playlist[]> {
    let userId = this.authService.getCurrentUser().id;

    return this.http.get<Playlist[]>(`/playlists/${userId}`);
  }

  getPlaylistById(playlistId: string): Observable<Playlist | undefined> {
    let userId = this.authService.getCurrentUser().id;

    return this.http.get<Playlist>(`/playlists/${userId}/${playlistId}`);
  }

  addMovieToPlaylists(movieId: string, playlistIds: string[]) {
    let userId = this.authService.getCurrentUser().id;

    return this.http.put<void>(`/playlists/${userId}/movies/${movieId}`, {
      playlistsToAdd: playlistIds
    });
  }

  removeMovieFromPlaylists(movieId: string, playlistIds: string[]) {
    let userId = this.authService.getCurrentUser().id;

    return this.http.put<void>(`/playlists/${userId}/movies/${movieId}`, {
      playlistsToRemove: playlistIds
    });
  }

  updateMoviePlaylists(movieId: string, playlistIds: string[], playlistsToAdd: string[]): void {
    let playlistsToRemove = playlistIds.filter(id => !playlistsToAdd.includes(id));

    if (playlistsToRemove.length > 0) {
      this.removeMovieFromPlaylists(movieId, playlistsToRemove).subscribe();
    }
    if (playlistsToAdd.length > 0) {
      this.addMovieToPlaylists(movieId, playlistsToAdd).subscribe();
    }
  }

  createPlaylist(name: string, movie?: MovieListing): Observable<Playlist> {
    let userId = this.authService.getCurrentUser().id;

    return this.http.post<Playlist>(`/playlists/${userId}`, {
      name: name.trim(),
      movieIdsToAdd: [movie?.id]
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

  private createSystemPlaylists(): Playlist[] {
    return [...SYSTEM_PLAYLISTS];
  }

  private throwPlaylistCreationError(message: string): Observable<never> {
    return throwError((): NetflixError => ({
      code: NetflixErrorCodes.PLAYLIST_CREATION_LIMIT_REACHED,
      message
    }));
  }
}
