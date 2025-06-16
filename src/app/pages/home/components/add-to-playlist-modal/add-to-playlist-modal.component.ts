import {Component, inject, input, OnInit, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserMovieListing} from '../../../../models/movie.model';
import {Playlist, PlaylistService} from '../../../../services/playlist/playlist.service';
import {map, Observable, of} from 'rxjs';

@Component({
  selector: 'netflix-add-to-playlist-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-to-playlist-modal.component.html',
  styleUrls: ['./add-to-playlist-modal.component.css']
})
export class AddToPlaylistModalComponent implements OnInit {
  movie = input.required<UserMovieListing>();
  onCloseModal = output();

  playlistService = inject(PlaylistService);

  playlists: Observable<Playlist[]> = of();

  selectedPlaylists: string[] = [];
  newPlaylistName = '';
  showNewPlaylistField = false;

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists().pipe(
      map(playlists => {
          this.selectedPlaylists = playlists
            .filter(playlist => playlist.movieIds.includes(this.movie().id))
            .map(playlist => playlist.id);

          return playlists;
        }
      )
    );
  }

  togglePlaylistSelection(playlistId: string) {
    if (this.selectedPlaylists.includes(playlistId)) {
      this.selectedPlaylists = this.selectedPlaylists.filter(id => id !== playlistId);
    } else {
      this.selectedPlaylists = [...this.selectedPlaylists, playlistId];
    }
  }

  createAndAddToPlaylist() {
    if (this.newPlaylistName.trim()) {
      this.playlistService.createPlaylist(this.newPlaylistName, this.movie()).subscribe((newPlaylist => {
        this.selectedPlaylists.push(newPlaylist.id);
        this.newPlaylistName = '';
        this.showNewPlaylistField = false;
      }))
    }
  }

  confirmSelection() {
    this.playlistService.updateMoviePlaylists(this.movie().id, this.selectedPlaylists);
    this.closeModal();
  }

  closeModal() {
    this.onCloseModal.emit();
  }
}
