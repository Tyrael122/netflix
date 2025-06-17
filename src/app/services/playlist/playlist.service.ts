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
  coverImageUrl?: string; // Cover image URL is gonna have the poster path of the first movie in the playlist.
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

  getPlaylistById(playlistId: string): Observable<Playlist | undefined> {
    const playlists = this.getCurrentUserPlaylists();
    const playlist = playlists.find(pl => pl.id === playlistId);
    return of(playlist);
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
    const newPlaylist: Playlist = {
      id: this.generateUniqueId(),
      name: name.trim(),
      movieIds: movie?.id ? [movie.id] : [],
      isSystemPlaylist: false,
      coverImageUrl: movie?.poster_path
    };

    this.getCurrentUserPlaylists().push(newPlaylist);
    return of(newPlaylist);
  }

  removeMovieFromPlaylist(playlist: Playlist, movieId: string): Observable<Playlist> {
    playlist.movieIds = playlist.movieIds.filter(id => id !== movieId);
    this.updatePlaylistCoverImage(playlist);

    return of(playlist);
  }

  private getCurrentUserPlaylists(): Playlist[] {
    const userId = this.authService.getCurrentUser().id;

    if (!this.playlists.has(userId)) {
      this.playlists.set(userId, this.createSystemPlaylists());
    }

    return this.playlists.get(userId)!;
  }

  private updatePlaylistCoverImage(playlist: Playlist) {
    if (playlist.movieIds.length === 0) {
      playlist.coverImageUrl = undefined; // Clear cover image if no movies are in the playlist
      return;
    }

    if (playlist.movieIds.length > 0) {
      const movieId = playlist.movieIds[playlist.movieIds.length - 1]; // Get the last movie in the playlist
      this.movieService.getMovieDetails(movieId).subscribe(movie => {
        if (movie.poster_path) {
          playlist.coverImageUrl = movie.poster_path;
        }
      });
    }
  }

  private createSystemPlaylists(): Playlist[] {
    return [
      {
        id: 'favorites',
        name: 'Favorites',
        movieIds: [],
        isSystemPlaylist: true
      },
      {
        id: 'watchlater',
        name: 'Watch Later',
        movieIds: [],
        isSystemPlaylist: true
      },
      {
        id: 'watched',
        name: 'Watched',
        movieIds: [],
        isSystemPlaylist: true
      }
    ]
  }

  private addMovieToPlaylist(playlist: Playlist, movieId: string): void {
    playlist.movieIds.push(movieId);

    this.updatePlaylistCoverImage(playlist);
  }

  private generateUniqueId(): string {
    return crypto.randomUUID();
  }
}
