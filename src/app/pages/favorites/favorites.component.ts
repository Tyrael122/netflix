import {Component, inject, OnInit} from '@angular/core';
import {FavoriteButtonComponent} from '../../components/favorite-button/favorite-button.component';
import {MoviePosterImageComponent} from '../../components/movie-poster-image/movie-poster-image.component';
import {RouterLink} from '@angular/router';
import {UserMovieService} from '../../services/user/user-movie.service';
import {UserMovie} from '../../models/movie.model';

@Component({
  selector: 'netflix-favorites',
  imports: [
    FavoriteButtonComponent,
    MoviePosterImageComponent,
    RouterLink
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  movies: UserMovie[] = [];

  private userMovieService = inject(UserMovieService);

  ngOnInit(): void {
    this.userMovieService.getFavoriteMovies().subscribe((movies: UserMovie[]) => {
      this.movies = movies;
    })
  }
}
