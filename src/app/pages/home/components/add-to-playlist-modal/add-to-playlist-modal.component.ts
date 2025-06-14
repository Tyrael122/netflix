// add-to-playlist-modal.component.ts
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserMovieListing} from '../../../../models/movie.model';
import {Playlist, PlaylistService} from '../../../../services/playlist/playlist.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'netflix-add-to-playlist-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-to-playlist-modal.component.html',
  styleUrls: ['./add-to-playlist-modal.component.css']
})
export class AddToPlaylistModalComponent {
  @Input() movie!: UserMovieListing;
  @Output() close = new EventEmitter<void>();
  @Output() addToPlaylist = new EventEmitter<{ playlistIds: string[], newPlaylistName?: string }>();

  playlists: Observable<Playlist[]>
  selectedPlaylists: string[] = [];
  newPlaylistName = '';
  showNewPlaylistField = false;

  constructor(private playlistService: PlaylistService) {
    this.playlists = this.playlistService.getPlaylists();
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
      this.addToPlaylist.emit({
        playlistIds: this.selectedPlaylists,
        newPlaylistName: this.newPlaylistName
      });
      this.closeModal();
    }
  }

  confirmSelection() {
    if (this.selectedPlaylists.length > 0) {
      this.addToPlaylist.emit({
        playlistIds: this.selectedPlaylists
      });
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
  }
}
