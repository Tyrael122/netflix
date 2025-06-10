import {Component} from '@angular/core';
import {MoviePosterImageComponent} from '../../../../components/movie-poster-image/movie-poster-image.component';

@Component({
  selector: 'netflix-similar-tab',
  imports: [
    MoviePosterImageComponent
  ],
  templateUrl: './similar-tab.component.html',
  styleUrl: './similar-tab.component.css'
})
export class SimilarTabComponent {

  similarMovies: any[] = [];

  navigateToMovie(id: string): void {
  }
}
