import {Component, input} from '@angular/core';
import {MovieDetails, UserMovieMetadata} from "../../../../models/movie.model";

@Component({
  selector: 'netflix-details-tab',
  imports: [],
  templateUrl: './details-tab.component.html',
  styleUrl: './details-tab.component.css'
})
export class DetailsTabComponent {
  movie = input.required<MovieDetails & UserMovieMetadata>()
}
