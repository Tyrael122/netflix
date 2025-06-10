import {Component, Input} from '@angular/core';
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

  @Input() navigateToMovie: (id: string) => void = () => {};
  similarMovies: any[] = [];
}
