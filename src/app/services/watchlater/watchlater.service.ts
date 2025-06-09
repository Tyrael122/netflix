import {inject, Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WatchlaterService {
  private watchlaterMap = new Map<string, string[]>(); // userId -> movie ids

  private authService = inject(AuthService);

  getWatchlater(): string[] {
    const user = this.authService.getCurrentUser();
    if (!user) return [];
    return this.watchlaterMap.get(user.id) ?? [];
  }

  toggleWatchlater(id: string): boolean {
    if (this.isWatchlater(id)) {
      this.removeWatchlater(id);
      return false; // Removed from favorites
    } else {
      this.addWatchlater(id);
      return true; // Added to favorites
    }
  }

  addWatchlater(movieId: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const list = this.watchlaterMap.get(user.id) ?? [];
    if (!list.includes(movieId)) {
      list.push(movieId);
      this.watchlaterMap.set(user.id, list);
    }
  }

  removeWatchlater(movieId: string): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const list = this.watchlaterMap.get(user.id) ?? [];
    this.watchlaterMap.set(user.id, list.filter(i => i !== movieId));
  }

  isWatchlater(id: string) {
    const user = this.authService.getCurrentUser();
    if (!user) return false;

    const list = this.watchlaterMap.get(user.id) ?? [];
    return list.includes(id);
  }
}
