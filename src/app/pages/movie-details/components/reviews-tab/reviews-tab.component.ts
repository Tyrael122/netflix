import {Component, ElementRef, inject, input, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {NetflixIconComponent} from '../../../../components/netflix-icon/netflix-icon.component';
import {ReviewService} from '../../../../services/review/review.service';
import {MovieListing} from '../../../../models/movie.model';
import {Review, ReviewDraft} from '../../../../models/reviews.model';

@Component({
  selector: 'netflix-reviews-tab',
  standalone: true,
  imports: [NetflixIconComponent, FormsModule, DatePipe, NgOptimizedImage],
  templateUrl: './reviews-tab.component.html',
  styleUrls: ['./reviews-tab.component.css']
})
export class ReviewsTabComponent {
  movie = input.required<MovieListing>();

  @ViewChild('reviewForm') reviewForm!: ElementRef<HTMLFormElement>;

  readonly reviewService = inject(ReviewService);
  hoverRating: number = 0;

  get currentReview(): ReviewDraft {
    return this.reviewService.getCurrentReview(this.movie().id);
  }

  get reviews(): Review[] {
    return this.reviewService.getReviewsForMovie(this.movie().id);
  }

  get canWriteReview(): boolean {
    return this.reviewService.hasSubmitReviewPermission();
  }

  get canViewReviews(): boolean {
    return this.reviewService.hasViewReviewsPermission();
  }

  isReviewFilled() {
    return this.currentReview.rating > 0 && this.currentReview.text.trim().length > 0;
  }

  submitReview(): void {
    this.reviewService.submitCurrentReview(this.movie().id);
  }

  updateReviewText(text: string): void {
    if (text.length > 500) {
      text = text.slice(0, 500);
    }

    this.reviewService.updateCurrentReview(this.movie().id, prev => ({...prev, text}));
  }

  updateUserRating(rating: number): void {
    this.reviewService.updateCurrentReview(this.movie().id, prev => ({
      ...prev,
      rating
    }));
  }

  likeReview(review: Review): void {
    this.reviewService.likeReview(this.movie().id, review.id);
  }

  scrollToReviewForm(): void {
    this.reviewForm.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    setTimeout(() => {
      const textarea = this.reviewForm.nativeElement.querySelector('textarea');
      textarea?.focus();
    }, 250);
  }

  getRatingsMap(): Record<number, string> {
    return {
      1: 'Terrible',
      2: 'Bad',
      3: 'Average',
      4: 'Good',
      5: 'Excellent'
    };
  }

  protected readonly Object = Object;
  protected readonly Number = Number;
}
