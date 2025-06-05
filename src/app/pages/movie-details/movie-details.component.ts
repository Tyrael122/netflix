import {Component, inject} from '@angular/core';
import {UserMovieDetails, UserMovieListing} from '../../models/movie.model';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MoviePosterImageComponent} from '../../components/movie-poster-image/movie-poster-image.component';
import {UserMovieService} from '../../services/user/user-movie.service';
import {FavoriteButtonComponent} from '../../components/favorite-button/favorite-button.component';
import {NetflixIconComponent} from '../../components/netflix-icon/netflix-icon.component';
import {NavbarComponent} from '../../components/navbar/navbar.component';

@Component({
  selector: 'netflix-movie-details',
  imports: [
    MoviePosterImageComponent,
    DatePipe,
    FavoriteButtonComponent,
    NetflixIconComponent,
    NavbarComponent
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  movie?: UserMovieDetails;

  private movieService = inject(UserMovieService);
  private activatedRoute = inject(ActivatedRoute);
  isLoading: boolean = false;

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.movieService.getMovieDetails(params['id']).subscribe((movie) => {
        this.movie = movie;
        console.log(this.movie);
      });
    });
  }

  goBack() {

  }

  retry() {

  }
}
