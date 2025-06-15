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

      this.updatePlaylistCoverImage(playlist, movieId);
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

  private updatePlaylistCoverImage(playlist: Playlist, movieId: string) {
    if (playlist.coverImageUrl === undefined && playlist.movieIds.length > 0) {
      this.movieService.getMovieDetails(movieId).subscribe(movie => {
        if (movie.poster_path) {
          playlist.coverImageUrl = movie.poster_path;
        }
      });
    }

    if (playlist.movieIds.length === 0) {
      playlist.coverImageUrl = undefined; // Clear cover image if no movies are in the playlist
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
  }

  private removeMovieFromPlaylist(playlist: Playlist, movieId: string): void {
    playlist.movieIds = playlist.movieIds.filter(id => id !== movieId);
  }

  private generateUniqueId(): string {
    return crypto.randomUUID();
  }
}
