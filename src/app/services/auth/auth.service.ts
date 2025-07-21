import {inject, Injectable} from '@angular/core';
import {User, UserCredentials} from '../../models/user.model';
import {Router} from '@angular/router';
import {AppRoutes} from '../../enums/app-routes';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, filter, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | undefined>(undefined);

  private router = inject(Router);

  private http = inject(HttpClient);

  constructor() {
    this.requestGuestUser();
  }

  signup(userCredentials: UserCredentials): Observable<User> {
    return this.http.post<User>("/auth/register", {
      ...userCredentials,
      name: this.getRandomName()
    }).pipe(
      map(response => {
        this.currentUserSubject.next(response);

        this.navigateToHomepage();

        return response;
      })
    )
  }

  login(userCredentials: UserCredentials): Observable<User> {
    return this.http.post<User>("/auth/login", userCredentials)
      .pipe(
        map(response => {
          this.currentUserSubject.next(response);

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
    const currentUser = this.currentUserSubject.getValue();
    if (!currentUser) {
      return false;
    }

    return !currentUser.isGuest;
  }

  getCurrentUser(): Observable<User> {
    return this.currentUserSubject.asObservable().pipe(
      filter((user): user is User => user !== undefined)
    );
  }

  private requestGuestUser() {
    this.http.get<User>("/auth/guest").subscribe(user => this.currentUserSubject.next(user));
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
