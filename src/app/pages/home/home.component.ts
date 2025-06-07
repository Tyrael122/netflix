import {Component, inject, OnInit} from '@angular/core';
import {UserMovieListing} from '../../models/movie.model';
import {UserMovieService} from '../../services/user/user-movie.service';
import {FormsModule} from '@angular/forms';
import {MoviePosterComponent} from '../../components/movie-poster/movie-poster.component';
import {NavbarContainerComponent} from '../../components/navbar-container/navbar-container.component';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';
import {PaginationComponent} from '../../components/pagination/pagination.component';

@Component({
  selector: 'netflix-home',
  imports: [
    FormsModule,
    MoviePosterComponent,
    NavbarContainerComponent,
    PaginationComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: UserMovieListing[] = [];

  private searchSubject = new Subject<string>();

  userMovieService = inject(UserMovieService);

  ngOnInit() {
    this.userMovieService.getPopularMovies(1).subscribe(movieList => {
      this.movies = movieList.results;
    })

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
      .subscribe(searchTerm => {
        this.searchMovies(searchTerm);
      });
  }

  onSearchChanged($event: string) {
    this.searchSubject.next($event);
  }

  searchMovies(searchTerm: string) {
    console.log(`Searching for movies with term: ${searchTerm}`);

    if (searchTerm.trim() === '') {
      this.userMovieService.getPopularMovies(1).subscribe(movieList => {
        this.movies = movieList.results;
      });
      return;
    }

    this.userMovieService.searchMovies(searchTerm).subscribe(movieList => {
      console.log(`Searching for movies with term: ${searchTerm}`);

      this.movies = movieList.results;
    });
  }
}
