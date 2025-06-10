import {Component, inject, OnInit} from '@angular/core';
import {UserMovieDetails} from '../../models/movie.model';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {MoviePosterImageComponent} from '../../components/movie-poster-image/movie-poster-image.component';
import {UserMovieService} from '../../services/user/user-movie.service';
import {FavoriteButtonComponent} from '../../components/favorite-button/favorite-button.component';
import {NetflixIconComponent} from '../../components/netflix-icon/netflix-icon.component';
import {NavbarContainerComponent} from '../../components/navbar-container/navbar-container.component';
import {
  LoadingSpinnerIndicatorComponent
} from '../../components/loading-spinner-indicator/loading-spinner-indicator.component';
import {FormsModule} from '@angular/forms';
import {ReviewsTabComponent} from './components/reviews-tab/reviews-tab.component';
import {DetailsTabComponent} from './components/details-tab/details-tab.component';
import {SimilarTabComponent} from './components/similar-tab/similar-tab.component';
import {MovieRatingComponent} from './components/movie-rating/movie-rating.component';

@Component({
  selector: 'netflix-movie-details',
  imports: [
    MoviePosterImageComponent,
    DatePipe,
    FavoriteButtonComponent,
    NetflixIconComponent,
    NavbarContainerComponent,
    LoadingSpinnerIndicatorComponent,
    FormsModule,
    ReviewsTabComponent,
    DetailsTabComponent,
    SimilarTabComponent,
    MovieRatingComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  movie?: UserMovieDetails;

  private movieService = inject(UserMovieService);
  private activatedRoute = inject(ActivatedRoute);
  isLoading: boolean = true;

  activeTab: string = 'details';
  newReview: any;
  reviews: any[] = [];
  userReviewText: string = '';
  userRating: number = 4;
  similarMovies: UserMovieDetails[] = [];

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.movieService.getMovieDetails(params['id']).subscribe({
        next: (movie) => this.movie = movie,
        complete: () => this.isLoading = false
      });
    });
  }

  submitReview() {
  }

  navigateToMovie(id: string) {

  }
}
