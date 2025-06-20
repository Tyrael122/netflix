import {Component, input} from '@angular/core';
import {MovieDetails, UserMovieMetadata} from '../../../../models/movie.model';
import {DetailsTabComponent} from '../details-tab/details-tab.component';
import {ReviewsTabComponent} from '../reviews-tab/reviews-tab.component';
import {SimilarTabComponent} from '../similar-tab/similar-tab.component';

@Component({
  selector: 'netflix-movie-details-tabs',
  imports: [
    DetailsTabComponent,
    ReviewsTabComponent,
    SimilarTabComponent
  ],
  templateUrl: './movie-details-tabs.component.html',
  styleUrl: './movie-details-tabs.component.css'
})
export class MovieDetailsTabsComponent {
  movie = input.required<MovieDetails & UserMovieMetadata>();

  activeTab: string = 'details';
}
