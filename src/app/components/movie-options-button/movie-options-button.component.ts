import {Component, ElementRef, HostListener, Input, input} from '@angular/core';
import {NetflixIconComponent} from '../netflix-icon/netflix-icon.component';
import {NgIf} from '@angular/common';
import {UserMovieListing} from '../../models/movie.model';
import {SingleDropdownOpenDirective} from '../../directives/single-dropdown-open.directive';

@Component({
  selector: 'netflix-movie-options-button',
  imports: [
    NetflixIconComponent,
    NgIf,
    SingleDropdownOpenDirective
  ],
  templateUrl: './movie-options-button.component.html',
  styleUrl: './movie-options-button.component.css'
})
export class MovieOptionsButtonComponent {
  movie = input.required<UserMovieListing>()
  size = input<string | number>('20px')

  isMenuOpen: boolean = false;

  constructor(private elementRef: ElementRef) {}

  // Close menu when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }
}
