import {Component, output} from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {UserIconComponent} from '../user-icon/user-icon.component';
import {RouterLink} from '@angular/router';
import {NetflixIconComponent} from '../netflix-icon/netflix-icon.component';

@Component({
  selector: 'netflix-navbar',
  imports: [
    SearchBarComponent,
    UserIconComponent,
    RouterLink,
    NetflixIconComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  onSearchChanged = output<string>()

  searchMovies(searchTerm: string) {
    // Emit the search term to the parent component
    this.onSearchChanged.emit(searchTerm);
  }
}
