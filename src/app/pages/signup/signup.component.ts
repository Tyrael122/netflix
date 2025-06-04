import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'netflix-signup',
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  email: string = "";
  password: string = "";
  confirmPassword: string = "";

  private authService = inject(AuthService);

  signup() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const user = {username: this.email, password: this.password};
    if (this.authService.signup(user)) {
      console.log('Signup successful');
      // Redirect to home or another page
    } else {
      console.error('Signup failed');
      // Show an error message
    }
  }
}
