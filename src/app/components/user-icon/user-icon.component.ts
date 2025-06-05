import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {RouterLink} from '@angular/router';
import {SlicePipe, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'netflix-user-icon',
  imports: [
    RouterLink,
    SlicePipe,
    UpperCasePipe
  ],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.css'
})
export class UserIconComponent {
  protected authService = inject(AuthService);
  showDropdown: boolean = false;

  getUsername() {
    const user = this.authService.getCurrentUser();
    return user?.credentials?.username || 'Guest';
  }
}
