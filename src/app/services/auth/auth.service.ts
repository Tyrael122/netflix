import {inject, Injectable} from '@angular/core';
import {User, UserCredentials} from '../../models/user.model';
import {Router} from '@angular/router';
import {AppRoutes} from '../../enums/app-routes';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser!: User;

  private router = inject(Router);

  private http = inject(HttpClient);

  public AuthService() {
    this.requestGuestUser();
  }

  signup(userCredentials: UserCredentials): Observable<User> {
    return this.http.post<User>("/auth/register", {
      ...userCredentials,
      name: this.getRandomName()
    }).pipe(
      map(response => {
        this.currentUser = response;

        this.navigateToHomepage();

        return response;
      })
    )
  }

  login(userCredentails: UserCredentials): Observable<User> {
    return this.http.post<User>("/auth/login", userCredentails)
      .pipe(
        map(response => {
          this.currentUser = response;

          this.navigateToHomepage();

          return response;
        })
      );
  }

  logout(): void {
    this.router.navigate([AppRoutes.LOGIN]).catch(
      err => console.error('Navigation error:', err)
    );
    this.requestGuestUser();
  }

  isLoggedIn(): boolean {
    return !this.currentUser.isGuest;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  private requestGuestUser() {
    this.http.get<User>("/auth/guest").subscribe(user => this.currentUser = user);
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
