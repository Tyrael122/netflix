import {Component, inject, OnInit} from '@angular/core';
import {UserMovie} from '../../models/movie.model';
import {RouterLink} from '@angular/router';
import {MoviePosterImageComponent} from '../../components/movie-poster-image/movie-poster-image.component';
import {UserMovieService} from '../../services/user/user-movie.service';
import {FavoriteButtonComponent} from '../../components/favorite-button/favorite-button.component';
import {FormsModule} from '@angular/forms';
import {SearchBarComponent} from '../../components/search-bar/search-bar.component';
import {UserIconComponent} from '../../components/user-icon/user-icon.component';
import {MoviePosterComponent} from '../../components/movie-poster/movie-poster.component';

@Component({
  selector: 'netflix-home',
  imports: [
    RouterLink,
    MoviePosterImageComponent,
    FavoriteButtonComponent,
    FormsModule,
    SearchBarComponent,
    UserIconComponent,
    MoviePosterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: UserMovie[] = [];

  userMovieService = inject(UserMovieService);

  ngOnInit() {
    this.userMovieService.getPopularMovies(1).subscribe(movieList => {
      this.movies = movieList.results;
    })
  }

  searchMovies(searchTerm: string) {
    console.log(`Searching for movies with term: ${searchTerm}`);

    if (searchTerm.trim() === '') {
      this.userMovieService.getPopularMovies(1).subscribe(movieList => {
        this.movies = movieList.results;
      });
      return;
    }

    this.userMovieService.getPopularMovies(1).subscribe(movieList => {
      console.log(`Searching for movies with term: ${searchTerm}`);

      this.movies = movieList.results.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }
}
