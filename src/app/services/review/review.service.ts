import {Injectable} from '@angular/core';

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  likes: number;
  created_at: string;
}

export interface ReviewDraft {
  readonly rating: number;
  readonly text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Map<string, Review[]> = new Map();

  private currentReviewDraft: ReviewDraft = {
    rating: 0,
    text: ''
  };

  get currentReview() {
    return this.currentReviewDraft;
  }

  updateCurrentReview(updateFunc: (prev: ReviewDraft) => ReviewDraft) {
    this.currentReviewDraft = updateFunc(this.currentReviewDraft);
  }

  getReviewsList(movieId: string): Review[] {
    if (!this.reviews.has(movieId)) {
      this.reviews.set(movieId, []);
    }
    return this.reviews.get(movieId) || [];
  }

  submitCurrentReview(movieId: string): void {
    if (this.currentReviewDraft.rating <= 0 || !this.currentReviewDraft.text.trim()) {
      console.error('Invalid review submission');
      return;
    }

    const newReview: Review = {
      id: crypto.randomUUID(),
      author: this.getRandomAuthor(),
      rating: this.currentReviewDraft.rating,
      content: this.currentReviewDraft.text,
      likes: 0,
      created_at: new Date().toISOString()
    }

    const movieReviews = this.getReviewsList(movieId);
    movieReviews.unshift(newReview);

    this.currentReviewDraft = {
      rating: 0,
      text: ''
    };
  }

  likeReview(movieId: string, reviewId: string): void {
    const movieReviews = this.getReviewsList(movieId);
    const review = movieReviews.find(r => r.id === reviewId);
    if (review) {
      review.likes += 1;
    } else {
      console.error('Review not found');
    }
  }

  private getRandomAuthor(): string {
    const authors = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];
    return authors[Math.floor(Math.random() * authors.length)];
  }
}
