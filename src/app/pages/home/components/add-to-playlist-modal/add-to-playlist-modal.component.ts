import {Component, inject, input, OnInit, output} from '@angular/core';
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
export class AddToPlaylistModalComponent implements OnInit {
  movie = input.required<UserMovieListing>();
  onCloseModal = output();

  playlistService = inject(PlaylistService);

  playlists: Observable<Playlist[]> | undefined
  selectedPlaylists: string[] = [];
  newPlaylistName = '';
  showNewPlaylistField = false;

  ngOnInit() {
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
      const newPlaylist = this.playlistService.createPlaylist(this.newPlaylistName, this.movie().id);
      this.selectedPlaylists.push(newPlaylist.id);
      this.newPlaylistName = '';
    }
  }

  confirmSelection() {
    if (this.selectedPlaylists.length > 0) {
      this.selectedPlaylists.forEach(playlistId => {
        this.playlistService.addToPlaylist(playlistId, this.movie().id);
      });

      this.closeModal();
    }
  }

  closeModal() {
    console.log('Closing Add to Playlist Modal');
    this.onCloseModal.emit();
  }
}
