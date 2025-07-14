import {inject, Injectable} from '@angular/core';
import {PlansService} from '../plans/plans.service';
import {createNetflixError, NetflixErrorCodes} from '../../models/errors.model';
import {AuthService} from '../auth/auth.service';
import {Review, ReviewDraft} from '../../models/reviews.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Map<string, Review[]> = new Map(); // movieId -> Review[]
  private reviewDrafts = new Map<string, ReviewDraft>(); // movieId -> ReviewDraft

  private readonly authService = inject(AuthService);
  private readonly plansService = inject(PlansService);

  // Public API methods - Core functionality
  getCurrentReview(movieId: string): ReviewDraft {
    if (this.reviewDrafts.has(movieId)) {
      return this.reviewDrafts.get(movieId)!;
    }

    const existingReview = this.findExistingUserReview(movieId);
    if (existingReview) {
      return this.createDraftFromExistingReview(movieId, existingReview);
    }

    return this.createNewDraft(movieId);
  }

  updateCurrentReview(movieId: string, updateFunc: (prev: ReviewDraft) => ReviewDraft): void {
    const currentDraft = this.getCurrentReview(movieId);
    this.reviewDrafts.set(movieId, updateFunc(currentDraft));
  }

  getReviewsForMovie(movieId: string): Review[] {
    this.verifyViewReviewsPermission();

    if (!this.reviews.has(movieId)) {
      this.reviews.set(movieId, []);
    }
    return this.reviews.get(movieId)!;
  }

  submitCurrentReview(movieId: string): void {
    const currentDraft = this.getCurrentReview(movieId);
    this.validateReviewDraft(currentDraft);
    this.verifySubmitReviewPermission();

    if (currentDraft.original_review_id) {
      this.handleReviewUpdate(movieId, currentDraft);
      return;
    }

    this.createNewReview(movieId, currentDraft);
    this.reviewDrafts.delete(movieId);
  }

  // Public API methods - Additional features
  likeReview(movieId: string, reviewId: string): void {
    const review = this.findReviewById(movieId, reviewId);
    if (!review) {
      console.error('Review not found');
      return;
    }
    review.likes += 1;
  }

  hasSubmitReviewPermission(): boolean {
    const plan = this.plansService.getCurrentUserPlanDetails();
    return plan.features.reviews.canWrite;
  }

  hasViewReviewsPermission(): boolean {
    const plan = this.plansService.getCurrentUserPlanDetails();
    return plan.features.reviews.canView;
  }

  // Private helper methods - Review draft operations
  private createNewDraft(movieId: string): ReviewDraft {
    const draft: ReviewDraft = {
      rating: 0,
      text: ''
    };
    this.reviewDrafts.set(movieId, draft);
    return draft;
  }

  private createDraftFromExistingReview(movieId: string, review: Review): ReviewDraft {
    const draft: ReviewDraft = {
      original_review_id: review.id,
      rating: review.rating,
      text: review.content
    };
    this.reviewDrafts.set(movieId, draft);
    return draft;
  }

  // Private helper methods - Review operations
  private createNewReview(movieId: string, draft: ReviewDraft): void {
    const currentUser = this.authService.getCurrentUser();
    const newReview: Review = {
      id: crypto.randomUUID(),
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatarUrl: currentUser.avatarUrl
      },
      rating: draft.rating,
      content: draft.text,
      likes: 0,
      created_at: new Date().toISOString()
    };

    this.getReviewsForMovie(movieId).unshift(newReview);
  }

  private updateExistingReview(existingReview: Review, draft: ReviewDraft): void {
    console.warn('Updating existing review instead of creating a new one');
    existingReview.rating = draft.rating;
    existingReview.content = draft.text;
    existingReview.likes = 0; // Reset likes on update
  }

  private handleReviewUpdate(movieId: string, draft: ReviewDraft): void {
    if (!draft.original_review_id) {
      throw new Error('Original review ID is required for updates');
    }

    const existingReview = this.findReviewById(movieId, draft.original_review_id);
    if (!existingReview) {
      throw new Error(`Original review not found: ${draft.original_review_id}`);
    }

    this.updateExistingReview(existingReview, draft);
  }

  // Private helper methods - Finding reviews
  private findExistingUserReview(movieId: string): Review | undefined {
    const currentUser = this.authService.getCurrentUser();
    return this.getReviewsForMovie(movieId)
      .find(review => review.author.id === currentUser.id);
  }

  private findReviewById(movieId: string, reviewId: string): Review | undefined {
    return this.getReviewsForMovie(movieId).find(r => r.id === reviewId);
  }

  // Private helper methods - Validation and permissions
  private validateReviewDraft(draft: ReviewDraft): void {
    if (draft.rating <= 0 || !draft.text.trim()) {
      throw new Error('Invalid review submission: Rating and text are required');
    }
  }

  private verifySubmitReviewPermission(): void {
    if (!this.hasSubmitReviewPermission()) {
      throw createNetflixError(
        NetflixErrorCodes.REVIEW_CREATION_NOT_ALLOWED,
        'You do not have permission to write reviews. Please upgrade your plan.'
      );
    }
  }

  private verifyViewReviewsPermission(): void {
    if (!this.hasViewReviewsPermission()) {
      throw createNetflixError(
        NetflixErrorCodes.REVIEW_VIEW_NOT_ALLOWED,
        'You do not have permission to view reviews. Please upgrade your plan.'
      );
    }
  }
}
