import {inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Observable, of} from 'rxjs';
import {MovieListing} from '../../models/movie.model';
import {MovieService} from '../movie/movie.service';

export interface Playlist {
  id: string;
  name: string;
  movieIds: string[];
  isSystemPlaylist: boolean;
  coverImageUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private readonly playlists = new Map<string, Playlist[]>(); // userId -> playlists
  private readonly authService = inject(AuthService);

  private readonly movieService = inject(MovieService);

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

      // update cover image if needed
    });
  }

  createPlaylist(name: string, movie: MovieListing): Playlist {
    const newPlaylist: Playlist = {
      id: this.generateUniqueId(),
      name,
      movieIds: movie.id ? [movie.id] : [],
      isSystemPlaylist: false,
      coverImageUrl: movie.poster_path
    };

    this.getCurrentUserPlaylists().push(newPlaylist);
    return newPlaylist;
  }

  private getCurrentUserPlaylists(): Playlist[] {
    const userId = this.authService.getCurrentUser().id;

    if (!this.playlists.has(userId)) {
      this.playlists.set(userId, this.createSystemPlaylists());
    }

    return this.playlists.get(userId)!;
  }

  private createSystemPlaylists() {
    return [
      {
        id: 'favorites',
        name: 'Favorites',
        movieIds: [],
        isSystemPlaylist: true,
        coverImageUrl: undefined
      },
      {
        id: 'watchlater',
        name: 'Watch Later',
        movieIds: [],
        isSystemPlaylist: true,
        coverImageUrl: undefined
      },
      {
        id: 'watched',
        name: 'Watched',
        movieIds: [],
        isSystemPlaylist: true,
        coverImageUrl: undefined
      }
    ]
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
