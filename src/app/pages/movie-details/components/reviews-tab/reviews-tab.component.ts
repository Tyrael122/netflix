import {Component, ElementRef, inject, input, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {NetflixIconComponent} from '../../../../components/netflix-icon/netflix-icon.component';
import {Review, ReviewDraft, ReviewService} from '../../../../services/review/review.service';
import {MovieListing} from '../../../../models/movie.model';

@Component({
  selector: 'netflix-reviews-tab',
  standalone: true,
  imports: [NetflixIconComponent, FormsModule, DatePipe],
  templateUrl: './reviews-tab.component.html',
  styleUrls: ['./reviews-tab.component.css']
})
export class ReviewsTabComponent {
  movie = input.required<MovieListing>();

  @ViewChild('reviewForm') reviewForm!: ElementRef<HTMLFormElement>;

  readonly reviewService = inject(ReviewService);
  hoverRating: number = 0;

  get currentReview(): ReviewDraft {
    return this.reviewService.currentReview;
  }

  get reviews(): Review[] {
    return this.reviewService.getReviewsList(this.movie().id);
  }

  scrollToReviewForm(): void {
    this.reviewForm.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    setTimeout(() => {
      const textarea = this.reviewForm.nativeElement.querySelector('textarea');
      textarea?.focus();
    }, 500);
  }

  canSubmitReview() {
    return this.currentReview.rating > 0 && this.currentReview.text.trim().length > 0;
  }

  submitReview(): void {
    this.reviewService.submitCurrentReview(this.movie().id);
  }

  updateReviewText(text: string): void {
    if (text.length > 500) {
      text = text.slice(0, 500);
    }

    this.reviewService.updateCurrentReview(prev => ({...prev, text}));
  }

  updateUserRating(rating: number): void {
    this.reviewService.updateCurrentReview(prev => ({
      ...prev,
      rating
    }));
  }

  likeReview(review: Review): void {
    this.reviewService.likeReview(this.movie().id, review.id);
  }
}
