import {Component, output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'netflix-search-bar',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  onSearchChanged = output<string>();

  searchTerm: string = '';

  searchMovies() {
    console.log(`Searching for movies with term: ${this.searchTerm}`);
    // You would typically call a service to fetch the search results

    this.onSearchChanged.emit(this.searchTerm.trim().toLowerCase());
  }
}
