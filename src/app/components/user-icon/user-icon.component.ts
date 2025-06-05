import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {RouterLink} from '@angular/router';
import {NetflixIconComponent} from '../netflix-icon/netflix-icon.component';

@Component({
  selector: 'netflix-user-icon',
  imports: [
    RouterLink,
    NetflixIconComponent,
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
