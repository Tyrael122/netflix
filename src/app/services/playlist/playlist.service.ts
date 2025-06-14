import {inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable, of} from 'rxjs';

export interface Playlist {
  id: string;
  name: string;
  movieIds: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private readonly playlists = new Map<string, Playlist[]>(); // userId -> playlists
  private readonly authService = inject(AuthService);

  getPlaylists(): Observable<Playlist[]> {
    return of(this.getCurrentUserPlaylists());
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

  createPlaylist(name: string, movieId?: string): Playlist {
    const newPlaylist: Playlist = {
      id: this.generateUniqueId(),
      name,
      movieIds: movieId ? [movieId] : []
    };

    this.getCurrentUserPlaylists().push(newPlaylist);
    return newPlaylist;
  }

  private getCurrentUserPlaylists(): Playlist[] {
    const userId = this.authService.getCurrentUser().id;

    if (!this.playlists.has(userId)) {
      this.playlists.set(userId, []);
    }

    return this.playlists.get(userId)!;
  }

  private addMovieToPlaylist(playlist: Playlist, movieId: string): void {
    playlist.movieIds.push(movieId);
  }

  private removeMovieFromPlaylist(playlist: Playlist, movieId: string): void {
    playlist.movieIds = playlist.movieIds.filter(id => id !== movieId);
  }

  private generateUniqueId(): string {
    return crypto.randomUUID();
  }
}
