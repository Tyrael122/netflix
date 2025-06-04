import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'netflix-login',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  private authService = inject(AuthService);

  login() {
    // Here you would typically call a service to handle the login logic
    console.log('Login attempted with:', this.email, this.password);

    const user = { username: this.email, password: this.password };

    if (this.authService.login(user)) {
      console.log('Login successful');
      // Redirect to home or another page
    } else {
      console.error('Login failed');
      // Show an error message
    }
  }
}
