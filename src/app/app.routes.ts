import {Routes} from '@angular/router';
import {MovieDetailsComponent} from './pages/movie-details/movie-details.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {PlaylistsComponent} from './pages/playlists/playlists.component';
import {AppRoutes} from './enums/app-routes';
import {PlaylistDetailsComponent} from './pages/playlist-details/playlist-details.component';
import {PlansComponent} from './pages/plans/plans.component';

// Helper function to remove leading slash for Angular route config
const cleanPath = (path: string) => path.startsWith('/') ? path.slice(1) : path;

export const routes: Routes = [
  {
    path: cleanPath(AppRoutes.MOVIE_DETAILS),
    component: MovieDetailsComponent
  },
  {
    path: cleanPath(AppRoutes.PLANS),
    component: PlansComponent
  },
  {
    path: cleanPath(AppRoutes.PLAYLIST_DETAILS),
    component: PlaylistDetailsComponent
  },
  {
    path: cleanPath(AppRoutes.PLAYLISTS),
    component: PlaylistsComponent
  },
  {
    path: cleanPath(AppRoutes.LOGIN),
    component: LoginComponent
  },
  {
    path: cleanPath(AppRoutes.SIGNUP),
    component: SignupComponent
  },
  {
    path: cleanPath(AppRoutes.HOME),
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: AppRoutes.HOME
  }
];
