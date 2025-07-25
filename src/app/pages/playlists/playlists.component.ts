import {Component, inject, OnInit} from '@angular/core';
import {MoviePosterImageComponent} from "../../components/movie-poster-image/movie-poster-image.component";
import {NavbarContainerComponent} from "../../components/navbar-container/navbar-container.component";
import {NetflixIconComponent} from "../../components/netflix-icon/netflix-icon.component";
import {RouterLink} from '@angular/router';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {RouteParams} from '../../enums/app-routes';
import {FormsModule} from '@angular/forms';
import {Playlist} from '../../models/playlist.model';

@Component({
  selector: 'netflix-playlists',
  imports: [
    MoviePosterImageComponent,
    NavbarContainerComponent,
    NetflixIconComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css'
})
export class PlaylistsComponent implements OnInit {
  showNewPlaylistField: boolean = false;
  newPlaylistName: string = '';

  private playlistService = inject(PlaylistService);

  playlists: Playlist[] = [];

  ngOnInit(): void {
    this.playlistService.getPlaylists().subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
    });
  }

  enableNewPlaylistField() {
    this.playlistService.validatePlaylistCreationLimit().subscribe(() => this.showNewPlaylistField = true)
  }

  createPlaylist() {
    if (this.newPlaylistName.trim() === '') {
      return;
    }

    this.playlistService.createPlaylist(this.newPlaylistName).subscribe((playlist) => {
        this.playlists.push(playlist);
        this.newPlaylistName = '';
        this.showNewPlaylistField = false;
      }
    );
  }

  protected readonly RouteParams = RouteParams;
}
