import {Component, effect, inject, Injector, input, OnInit, runInInjectionContext} from '@angular/core';
import {MoviePosterImageComponent} from '../../../../components/movie-poster-image/movie-poster-image.component';
import {MovieListing} from '../../../../models/movie.model';
import {UserMovieService} from '../../../../services/user/user-movie.service';
import {RouterLink} from '@angular/router';
import {RouteParams} from '../../../../enums/app-routes';

@Component({
  selector: 'netflix-similar-tab',
  imports: [
    MoviePosterImageComponent,
    RouterLink
  ],
  templateUrl: './similar-tab.component.html',
  styleUrl: './similar-tab.component.css'
})
export class SimilarTabComponent implements OnInit {
  movie = input.required<MovieListing>();

  similarMovies: MovieListing[] = [];
  canSeeSimilarMovies = false;

  private injector = inject(Injector);
  private moviesService = inject(UserMovieService);

  ngOnInit() {
    this.moviesService.hasPermissionToSeeSimilarMovies().subscribe(
      (hasPermission) => {
        runInInjectionContext(this.injector, () => {
            this.canSeeSimilarMovies = hasPermission;

            if (hasPermission) {
              effect(() => {
                this.fetchSimilarMovies(this.movie().id);
              });
            }
          }
        );
      });
  }

  private fetchSimilarMovies(movieId: string) {
    this.moviesService.getSimilarMovies(movieId).subscribe(
      (pageableResponse) => this.similarMovies = pageableResponse.results,
    );
  }

  protected readonly RouteParams = RouteParams;
}
