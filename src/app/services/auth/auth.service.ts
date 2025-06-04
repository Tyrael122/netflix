import {inject, Injectable} from '@angular/core';
import {User} from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;

  private router = inject(Router);

  signup(user: User): boolean {
    if (this.users.find(u => u.username === user.username)) return false;
    this.users.push(user);

    this.currentUser = user; // Automatically log in the user after signup
    this.router.navigate(['/']); // Redirect to home page after signup

    return true;
  }

  login(user: User): boolean {
    const found = this.users.find(
      u => u.username === user.username && u.password === user.password
    );

    if (found) {
      this.currentUser = found;
      this.router.navigate(['/']); // Redirect to home page after login

      return true;
    }
    return false;
  }

  logout(): void {
    this.router.navigate(['/login']); // Redirect to login page after logout
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
