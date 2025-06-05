import {Component, output} from '@angular/core';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {UserIconComponent} from '../user-icon/user-icon.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NetflixIconComponent} from '../netflix-icon/netflix-icon.component';
import {NgIf} from '@angular/common';
// import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'netflix-navbar',
  imports: [
    SearchBarComponent,
    UserIconComponent,
    RouterLink,
    NetflixIconComponent,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  // animations: [
  //   trigger('mobileMenuAnimation', [
  //     transition(':enter', [
  //       style({ opacity: 0, transform: 'translateY(-20px)' }),
  //       animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  //     ]),
  //     transition(':leave', [
  //       animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
  //     ])
  //   ])
  // ]
})
export class NavbarComponent {
  onSearchChanged = output<string>()
  isMobileMenuOpen = false;
  isSearchOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Close search when opening menu
    if (this.isMobileMenuOpen) this.isSearchOpen = false;
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    // Close menu when opening search
    if (this.isSearchOpen) this.isMobileMenuOpen = false;
  }

  searchMovies(searchTerm: string) {
    // Emit the search term to the parent component
    this.onSearchChanged.emit(searchTerm);
  }
}
