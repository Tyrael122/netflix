import {Component, inject, input, OnInit, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserMovieListing} from '../../../../models/movie.model';
import {PlaylistService} from '../../../../services/playlist/playlist.service';
import {Playlist} from '../../../../models/playlist.model';

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

  playlists: Playlist[] = [];

  selectedPlaylists: string[] = [];
  newPlaylistName = '';
  showNewPlaylistField = false;

  ngOnInit() {
    this.playlistService.getPlaylists().subscribe(
      playlists => {
        this.selectedPlaylists = playlists
          .filter(playlist => playlist.movieIds.includes(this.movie().id))
          .map(playlist => playlist.id);

        this.playlists = playlists;
      }
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
      this.playlistService.createPlaylist(this.newPlaylistName, this.movie()).subscribe(
        newPlaylist => {
          this.selectedPlaylists.push(newPlaylist.id);
          this.playlists.push(newPlaylist);

          this.newPlaylistName = '';
          this.showNewPlaylistField = false;
        }
      )
    }
  }

  confirmSelection() {
    this.playlistService.updateMoviePlaylists(this.movie().id, this.playlists.map(p => p.id), this.selectedPlaylists);
    this.closeModal();
  }

  closeModal() {
    this.onCloseModal.emit();
  }

  enableNewPlaylistField() {
    this.playlistService.validatePlaylistCreationLimit().subscribe(() => this.showNewPlaylistField = true)
  }
}
