import {Routes} from '@angular/router';
import {MovieDetailsComponent} from './pages/movie-details/movie-details.component';
import {HomeComponent} from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {FavoritesComponent} from './pages/favorites/favorites.component';

export const routes: Routes = [
  {
    path: "movie/:id",
    component: MovieDetailsComponent
  },
  {
    path: "favorites",
    component: FavoritesComponent
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
