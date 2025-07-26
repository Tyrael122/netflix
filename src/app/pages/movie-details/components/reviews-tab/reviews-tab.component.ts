import {Component, ElementRef, inject, input, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {NetflixIconComponent} from '../../../../components/netflix-icon/netflix-icon.component';
import {ReviewService} from '../../../../services/review/review.service';
import {MovieListing} from '../../../../models/movie.model';
import {Review, ReviewDraft} from '../../../../models/reviews.model';
import {debounceTime, distinctUntilChanged, Subject} from 'rxjs';

@Component({
  selector: 'netflix-reviews-tab',
  standalone: true,
  imports: [NetflixIconComponent, FormsModule, DatePipe, NgOptimizedImage],
  templateUrl: './reviews-tab.component.html',
  styleUrls: ['./reviews-tab.component.css']
})
export class ReviewsTabComponent implements OnInit {
  movie = input.required<MovieListing>();

  @ViewChild('reviewForm') reviewForm!: ElementRef<HTMLFormElement>;

  private currentReviewSubject = new Subject<ReviewDraft>();
  currentReview: ReviewDraft = {
    rating: 0,
    content: ''
  }

  draftReviewInfoMessage: string = '';

  reviews: Review[] = [];

  readonly reviewService = inject(ReviewService);
  hoverRating: number = 0;

  canWriteReview = false;
  canViewReviews = false;

  ngOnInit(): void {
    this.currentReviewSubject
      .pipe(
        debounceTime(2000),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
      )
      .subscribe(review => {
        this.reviewService.updateCurrentReview(this.movie().id, review)
          .subscribe(() => {
            this.draftReviewInfoMessage = 'Draft saved';
          })
      });

    this.reviewService.hasSubmitReviewPermission().subscribe(hasPermission => {
      this.canWriteReview = hasPermission;

      if (hasPermission) {
        this.reviewService.getCurrentReview(this.movie().id).subscribe(review => {
          this.currentReview = review;
        })
      }
    });

    this.reviewService.hasViewReviewsPermission().subscribe(hasPermission => {
      this.canViewReviews = hasPermission;
      if (hasPermission) {
        this.loadReviews();
      }
    });
  }

  isReviewFilled() {
    return this.currentReview.rating > 0 && this.currentReview.content.trim().length > 0;
  }

  submitReview(): void {
    this.reviewService.submitCurrentReview(this.movie().id, this.currentReview).subscribe(() => {
      this.loadReviews();
    })
  }

  updateReviewText(text: string): void {
    if (text.length > 500) {
      text = text.slice(0, 500);
    }

    this.updateCurrectReviewDraft({
      ...this.currentReview,
      content: text
    });
  }

  updateUserRating(rating: number): void {
    this.updateCurrectReviewDraft({
      ...this.currentReview,
      rating: rating
    });
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

  private loadReviews() {
    this.reviewService.getReviewsForMovie(this.movie().id).subscribe(reviews => {
      this.reviews = reviews;
    })
  }

  private updateCurrectReviewDraft(newDraft: ReviewDraft) {

    // Add a small delay to allow transition
    setTimeout(() => {
      this.draftReviewInfoMessage = 'Changes are being saved...';
    }, 300);

    this.currentReview = newDraft;
    this.currentReviewSubject.next(newDraft);
  }

  protected readonly Object = Object;
  protected readonly Number = Number;
}
