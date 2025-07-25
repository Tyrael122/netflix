import {Component, ElementRef, inject, input, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import {NetflixIconComponent} from '../../../../components/netflix-icon/netflix-icon.component';
import {ReviewService} from '../../../../services/review/review.service';
import {MovieListing} from '../../../../models/movie.model';
import {Review, ReviewDraft} from '../../../../models/reviews.model';
import {debounceTime, distinctUntilChanged, Observable, Subject} from 'rxjs';

@Component({
  selector: 'netflix-reviews-tab',
  standalone: true,
  imports: [NetflixIconComponent, FormsModule, DatePipe, NgOptimizedImage, AsyncPipe],
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

  reviews: Review[] = [];

  readonly reviewService = inject(ReviewService);
  hoverRating: number = 0;

  ngOnInit(): void {
    this.reviewService.getCurrentReview(this.movie().id).subscribe(review => {
      this.currentReview = review;
    })

    this.loadReviews();

    this.currentReviewSubject
      .pipe(
        debounceTime(2000),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
      )
      .subscribe(review => {
        console.log("Received review update: ", review);
        this.reviewService.updateCurrentReview(this.movie().id, review);
      });
  }

  get canWriteReview(): Observable<boolean> {
    return this.reviewService.hasSubmitReviewPermission();
  }

  get canViewReviews(): Observable<boolean> {
    return this.reviewService.hasViewReviewsPermission();
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
    this.currentReview = newDraft;
    console.log("Updating current review draft: ", newDraft);
    this.currentReviewSubject.next(newDraft);
  }

  protected readonly Object = Object;
  protected readonly Number = Number;
}
