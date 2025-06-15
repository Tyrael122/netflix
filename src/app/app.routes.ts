import {Routes} from '@angular/router';
import {MovieDetailsComponent} from './pages/movie-details/movie-details.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {PlaylistsComponent} from './pages/playlists/playlists.component';

export const routes: Routes = [
  {
    path: "movie/:id",
    component: MovieDetailsComponent
  },
  {
    path: "playlists",
    component: PlaylistsComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "",
    component: HomeComponent
  }
];
