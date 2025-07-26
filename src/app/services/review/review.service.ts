import {inject, Injectable} from '@angular/core';
import {PlansService} from '../plans/plans.service';
import {AuthService} from '../auth/auth.service';
import {Review, ReviewDraft} from '../../models/reviews.model';
import {map, Observable, switchMap} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private readonly authService = inject(AuthService);
  private readonly plansService = inject(PlansService);

  private readonly http = inject(HttpClient);

  getCurrentReview(movieId: string): Observable<ReviewDraft> {
    return this.buildUrl(movieId, "/draft").pipe(
      switchMap((url) => this.http.get<ReviewDraft>(url))
    )
  }

  updateCurrentReview(movieId: string, draft: ReviewDraft): Observable<ReviewDraft> {
    return this.buildUrl(movieId, "/draft").pipe(
      switchMap((url) => this.http.put<ReviewDraft>(url, draft))
    )
  }

  getReviewsForMovie(movieId: string): Observable<Review[]> {
    return this.buildUrl(movieId, "").pipe(
      switchMap((url) => this.http.get<Review[]>(url))
    )
  }

  submitCurrentReview(movieId: string, draft: ReviewDraft): Observable<Review> {
    return this.buildUrl(movieId, "/submit").pipe(
      switchMap((url) => this.http.post<Review>(url, draft))
    );
  }

  likeReview(movieId: string, reviewId: string): void {
    // No-op, implement in a future release.
  }

  hasSubmitReviewPermission(): Observable<boolean> {
    return this.plansService.getCurrentUserPlanDetails().pipe(
      map(plan => plan.features.reviews.canWrite)
    );
  }

  hasViewReviewsPermission(): Observable<boolean> {
    return this.plansService.getCurrentUserPlanDetails().pipe(
      map(plan => plan.features.reviews.canView)
    );
  }

  private buildUrl(movieId: string, endpoint: string): Observable<string> {
    return this.authService.getCurrentUser().pipe(
      map((user) => `/reviews/${user.id}/movies/${movieId}${endpoint}`)
    )
  }
}
