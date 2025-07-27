import {Component, inject, ViewChild} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
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

  @ViewChild('signupForm') signupForm!: NgForm;

  private authService = inject(AuthService);

  signup() {
    if (!this.signupForm.valid || !this.doPasswordsMatch()) {
      return;
    }

    const userCredentials = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.authService.signup(userCredentials).subscribe();
  }

  doPasswordsMatch() {
    return this.password === this.confirmPassword;
  }
}
