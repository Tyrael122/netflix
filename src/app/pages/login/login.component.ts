import {Component, ElementRef, inject, ViewChild} from '@angular/core';
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
    console.log('Login attempted with:', this.email, this.password);

    if (!this.loginForm.valid) {
      return;
    }

    const user = {username: this.email, password: this.password};

    if (this.authService.login(user)) {
      console.log('Login successful');
    } else {
      this.toastService.showToast("Login failed. Please check your credentials.");
    }
  }
}
