import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {ToastService} from '../../services/toast/toast.service';

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
  private toastService = inject(ToastService);

  signup() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    const userCredentials = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.authService.signup(userCredentials).subscribe({
      error: error => {
        console.error('Login failed:', error);
        this.toastService.showToast(error.error.friendlyMessage); // TODO: Improve error handling
      }
    })
  }
}
