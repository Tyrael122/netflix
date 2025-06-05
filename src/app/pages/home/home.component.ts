import {Component, inject, OnInit} from '@angular/core';
import {UserMovie} from '../../models/movie.model';
import {UserMovieService} from '../../services/user/user-movie.service';
import {FormsModule} from '@angular/forms';
import {MoviePosterComponent} from '../../components/movie-poster/movie-poster.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';

@Component({
  selector: 'netflix-home',
  imports: [
    FormsModule,
    MoviePosterComponent,
    NavbarComponent
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
