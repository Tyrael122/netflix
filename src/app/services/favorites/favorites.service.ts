import {inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesMap = new Map<string, string[]>(); // username -> favorites

  private authService = inject(AuthService);

  getFavorites(): string[] {
    const user = this.authService.getCurrentUser();
    if (!user) return [];
    return this.favoritesMap.get(user.username) ?? [];
  }

  addFavorite(movieId: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const list = this.favoritesMap.get(user.username) ?? [];
    if (!list.includes(movieId)) {
      list.push(movieId);
      this.favoritesMap.set(user.username, list);
    }
  }

  removeFavorite(movieId: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const list = this.favoritesMap.get(user.username) ?? [];
    this.favoritesMap.set(user.username, list.filter(i => i !== movieId));
  }

  isFavorite(id: string) {
    const user = this.authService.getCurrentUser();
    if (!user) return false;

    const list = this.favoritesMap.get(user.username) ?? [];
    return list.includes(id);
  }
}

