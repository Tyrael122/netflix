import {inject, Injectable} from '@angular/core';
import {map, Observable, of, switchMap} from 'rxjs';
import {MovieListing} from '../../models/movie.model';
import {Playlist} from '../../models/playlist.model';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private readonly authService = inject(AuthService);

  private readonly http = inject(HttpClient);

  getPlaylists(): Observable<Playlist[]> {
    return this.buildUrl('').pipe(
      switchMap(url => this.http.get<Playlist[]>(url))
    );
  }

  getPlaylistById(playlistId: string): Observable<Playlist | undefined> {
    return this.buildUrl(`/${playlistId}`).pipe(
      switchMap(url => this.http.get<Playlist>(url))
    );
  }

  addMovieToPlaylists(movieId: string, playlistIds: string[]) {
    return this.buildUrl(`/movies/${movieId}`).pipe(
      switchMap(url => this.http.put<void>(url, {
        playlistsToAdd: playlistIds
      }))
    );
  }

  removeMovieFromPlaylists(movieId: string, playlistIds: string[]) {
    return this.buildUrl(`/movies/${movieId}`).pipe(
      switchMap(url => this.http.put<void>(url, {
        playlistsToRemove: playlistIds
      }))
    );
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
    return this.buildUrl('').pipe(
      switchMap(url => this.http.post<Playlist>(url, {
        name: name.trim(),
        movieIdsToAdd: [movie?.id]
      }))
    );
  }

  validatePlaylistCreationLimit(): Observable<boolean> {
    return of(true);
  }

  private buildUrl(endpoint: string): Observable<string> {
    return this.authService.getCurrentUser().pipe(
      map(user => `/playlists/${user.id}${endpoint}`)
    )
  }
}
