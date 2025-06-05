import {inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesMap = new Map<string, string[]>(); // userId -> favorites

  private authService = inject(AuthService);

  getFavorites(): string[] {
    const user = this.authService.getCurrentUser();
    if (!user) return [];
    return this.favoritesMap.get(user.id) ?? [];
  }

  addFavorite(movieId: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const list = this.favoritesMap.get(user.id) ?? [];
    if (!list.includes(movieId)) {
      list.push(movieId);
      this.favoritesMap.set(user.id, list);
    }
  }

  removeFavorite(movieId: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const list = this.favoritesMap.get(user.id) ?? [];
    this.favoritesMap.set(user.id, list.filter(i => i !== movieId));
  }

  isFavorite(id: string) {
    const user = this.authService.getCurrentUser();
    if (!user) return false;

    const list = this.favoritesMap.get(user.id) ?? [];
    return list.includes(id);
  }
}

