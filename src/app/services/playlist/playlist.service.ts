// services/playlist.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlists = new BehaviorSubject<Playlist[]>([
    { id: '1', name: 'Favorites', movieIds: [] },
    { id: '2', name: 'Watch Later', movieIds: [] },
    { id: '3', name: 'Action Movies', movieIds: [] }
  ]);

  getPlaylists() {
    return this.playlists.asObservable();
  }

  addToPlaylist(playlistId: string, movieId: string) {
    const current = this.playlists.value;
    const updated = current.map(playlist => {
      if (playlist.id === playlistId && !playlist.movieIds.includes(movieId)) {
        return { ...playlist, movieIds: [...playlist.movieIds, movieId] };
      }
      return playlist;
    });
    this.playlists.next(updated);
  }

  createPlaylist(name: string, movieId?: string) {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      movieIds: movieId ? [movieId] : []
    };
    this.playlists.next([...this.playlists.value, newPlaylist]);
    return newPlaylist;
  }
}

export interface Playlist {
  id: string;
  name: string;
  movieIds: string[];
}
