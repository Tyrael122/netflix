import {Component, input} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'netflix-movie-poster-image',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './movie-poster-image.component.html',
  styleUrl: './movie-poster-image.component.css'
})
export class MoviePosterImageComponent {
  poster_path = input<string>();
}
