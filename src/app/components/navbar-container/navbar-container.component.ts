import {Component, output} from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'netflix-navbar-container',
  imports: [
    NavbarComponent
  ],
  templateUrl: './navbar-container.component.html',
  styleUrl: './navbar-container.component.css'
})
export class NavbarContainerComponent {
  searchChanged = output<string>();

  onSearchChanged(value: string) {
    this.searchChanged.emit(value); // bubble it up
  }
}
