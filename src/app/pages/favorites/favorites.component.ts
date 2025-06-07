import {Component, inject, OnInit} from '@angular/core';
import {FavoriteButtonComponent} from '../../components/favorite-button/favorite-button.component';
import {MoviePosterImageComponent} from '../../components/movie-poster-image/movie-poster-image.component';
import {RouterLink} from '@angular/router';
import {UserMovieService} from '../../services/user/user-movie.service';
import {UserMovieListing} from '../../models/movie.model';
import {AuthService} from '../../services/auth/auth.service';
import {NetflixIconComponent} from '../../components/netflix-icon/netflix-icon.component';
import {NavbarContainerComponent} from '../../components/navbar-container/navbar-container.component';

@Component({
  selector: 'netflix-favorites',
  imports: [
    FavoriteButtonComponent,
    MoviePosterImageComponent,
    RouterLink,
    NetflixIconComponent,
    NavbarContainerComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: UserMovieListing[] = [];

  private userMovieService = inject(UserMovieService);
  protected authService = inject(AuthService);

  ngOnInit(): void {
    this.userMovieService.getFavoriteMovies().subscribe((movies: UserMovieListing[]) => {
      this.favoriteMovies = movies;
    })
  }
}
