import {Component, inject, OnInit} from '@angular/core';
import {MoviePosterImageComponent} from "../../components/movie-poster-image/movie-poster-image.component";
import {NavbarContainerComponent} from "../../components/navbar-container/navbar-container.component";
import {NetflixIconComponent} from "../../components/netflix-icon/netflix-icon.component";
import {RouterLink} from '@angular/router';
import {Playlist, PlaylistService} from '../../services/playlist/playlist.service';
import {RouteParams} from '../../enums/app-routes';

@Component({
  selector: 'netflix-playlists',
  imports: [
    MoviePosterImageComponent,
    NavbarContainerComponent,
    NetflixIconComponent,
    RouterLink
  ],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.css'
})
export class PlaylistsComponent implements OnInit {
  private playlistService = inject(PlaylistService);

  playlists: Playlist[] = [];

  ngOnInit(): void {
    this.playlistService.getPlaylists().subscribe((playlists: Playlist[]) => {
      this.playlists = playlists;
    });
  }

  createNewPlaylist() {
  }

  protected readonly RouteParams = RouteParams;
}
