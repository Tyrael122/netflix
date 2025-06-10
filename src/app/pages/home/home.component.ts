import { Component, inject, OnInit } from '@angular/core';
import { UserMovieListing } from '../../models/movie.model';
import { UserMovieService } from '../../services/user/user-movie.service';
import { FormsModule } from '@angular/forms';
import { MoviePosterComponent } from './components/movie-poster/movie-poster.component';
import { NavbarContainerComponent } from '../../components/navbar-container/navbar-container.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import {
  LoadingSpinnerIndicatorComponent
} from '../../components/loading-spinner-indicator/loading-spinner-indicator.component';

@Component({
  selector: 'netflix-home',
  standalone: true,
  imports: [
    FormsModule,
    MoviePosterComponent,
    NavbarContainerComponent,
    InfiniteScrollDirective,
    LoadingSpinnerIndicatorComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: UserMovieListing[] = [];
  currentPage = 1;
  isLoading = false;
  hasMore = true;
  currentSearchTerm = '';

  private searchSubject = new Subject<string>();

  userMovieService = inject(UserMovieService);

  ngOnInit() {
    this.loadMovies();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.currentSearchTerm = searchTerm;
      this.currentPage = 1;
      this.movies = [];
      this.hasMore = true;
      this.loadMovies();
    });
  }

  loadMovies() {
    if (this.isLoading || !this.hasMore) return;

    this.isLoading = true;

    const observable = this.currentSearchTerm.trim() === ''
      ? this.userMovieService.getPopularMovies(this.currentPage)
      : this.userMovieService.searchMovies(this.currentSearchTerm, this.currentPage);

    observable.subscribe({
      next: (movieList) => {
        this.movies = [...this.movies, ...movieList.results];
        this.currentPage++;
        this.hasMore = movieList.results.length > 0;
      },
      error: (err) => console.error(err),
      complete: () => this.isLoading = false
    });
  }

  onSearchChanged($event: string) {
    this.searchSubject.next($event);
  }
}
