import {inject, Injectable} from '@angular/core';
import {User, UserCredentials} from '../../models/user.model';
import {Router} from '@angular/router';
import {AppRoutes} from '../../enums/app-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = []; // This should be stored in a database in a real application
  private currentUser: User = this.createGuestUser();

  private router = inject(Router);

  signup(userCredentials: UserCredentials): boolean {
    if (!userCredentials.username || !userCredentials.password) return false;

    // Check if the username already exists
    const existingUser = this.users.find(u => u.credentials?.username === userCredentials.username);
    if (existingUser) {
      return false; // Username already exists
    }

    this.currentUser.credentials = userCredentials;
    this.currentUser.isGuest = false;

    console.log('User signed up:', this.currentUser);

    this.navigateToHomepage();

    return true;
  }

  login(user: UserCredentials): boolean {
    if (!user.username || !user.password) return false;

    // Find the user by username and password
    const found = this.users.find(u =>
      u.credentials?.username === user.username &&
      u.credentials?.password === user.password
    );

    if (!found) {
      return false; // User not found
    }
    this.currentUser = found;
    this.navigateToHomepage(); // Redirect to home page after login

    return true;
  }

  logout(): void {
    this.router.navigate([AppRoutes.LOGIN]).catch(
      err => console.error('Navigation error:', err)
    );
    this.currentUser = this.createGuestUser();
  }

  isLoggedIn(): boolean {
    return !this.currentUser.isGuest;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  private createGuestUser(): User {
    const user = {
      id: crypto.randomUUID(),
      isGuest: true,
      name: this.getRandomName()
    }

    this.users.push(user);

    return user;
  }

  private navigateToHomepage() {
    this.router.navigate([AppRoutes.HOME]).catch(
      err => console.error('Navigation error:', err)
    );
  }

  private getRandomName(): string {
    const name = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
    return name[Math.floor(Math.random() * name.length)];
  }
}
