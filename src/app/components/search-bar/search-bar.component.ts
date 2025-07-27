import {Component, output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NetflixIconComponent} from '../netflix-icon/netflix-icon.component';

@Component({
  selector: 'netflix-search-bar',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NetflixIconComponent
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  onSearchChanged = output<string>();

  searchTerm: string = '';

  searchMovies() {
    this.onSearchChanged.emit(this.searchTerm.trim().toLowerCase());
  }
}
