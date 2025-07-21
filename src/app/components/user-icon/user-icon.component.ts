import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {RouterLink} from '@angular/router';
import {NetflixIconComponent} from '../netflix-icon/netflix-icon.component';
import {AsyncPipe} from '@angular/common';
import {map} from 'rxjs';

@Component({
  selector: 'netflix-user-icon',
  imports: [
    RouterLink,
    NetflixIconComponent,
    AsyncPipe,
  ],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.css'
})
export class UserIconComponent {
  protected authService = inject(AuthService);

  showDropdown: boolean = false;

  getUsername() {
    return this.authService.getCurrentUser().pipe(
      map(user => user?.name || 'Guest')
    )
  }
}
