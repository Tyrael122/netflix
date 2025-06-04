import { Component, inject } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'netflix-user-icon',
  imports: [
    RouterLink
  ],
  templateUrl: './user-icon.component.html',
  styleUrl: './user-icon.component.css'
})
export class UserIconComponent {
  protected authService = inject(AuthService);
  showDropdown: boolean = false;
}
