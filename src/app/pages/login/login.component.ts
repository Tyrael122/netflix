import {Component, inject, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {RouterLink} from '@angular/router';
import {ToastService} from '../../services/toast/toast.service';

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

  @ViewChild('loginForm') loginForm!: NgForm;

  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  login() {
    if (!this.loginForm.valid) {
      return;
    }

    const userCredentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(userCredentials).subscribe({
      error: error => {
        console.error('Login failed:', error);
        this.toastService.showToast("Login failed. Please check your credentials.");
      }
    })
  }
}
