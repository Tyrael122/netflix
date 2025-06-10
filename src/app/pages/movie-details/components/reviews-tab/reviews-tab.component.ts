import {Component, ElementRef, ViewChild} from '@angular/core';
import {NetflixIconComponent} from '../../../../components/netflix-icon/netflix-icon.component';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  likes: number;
  created_at: string;
}

@Component({
  selector: 'netflix-reviews-tab',
  imports: [
    NetflixIconComponent,
    FormsModule,
    DatePipe
  ],
  templateUrl: './reviews-tab.component.html',
  styleUrl: './reviews-tab.component.css'
})
export class ReviewsTabComponent {

  userRating: number = 4
  userTextReview: string = '';

  hoverRating: number = 0;

  // reviews: Review[] = [
  //   {
  //     id: '1',
  //     author: 'Alice',
  //     rating: 5,
  //     content: 'Absolutely loved this movie! The story and visuals were amazing.',
  //     likes: 10,
  //     created_at: '2024-06-01T14:23:00Z'
  //   },
  //   {
  //     id: '2',
  //     author: 'Bob',
  //     rating: 4,
  //     content: 'Great performances and direction. Worth watching.',
  //     likes: 5,
  //     created_at: '2024-06-02T10:15:00Z'
  //   },
  //   {
  //     id: '3',
  //     author: 'Charlie',
  //     rating: 3,
  //     content: 'It was entertaining, but the pacing was a bit slow in the middle.',
  //     likes: 2,
  //     created_at: '2024-06-03T18:45:00Z'
  //   }
  // ]

  reviews: Review[] = [];

  @ViewChild('reviewForm') reviewForm!: ElementRef;

  scrollToReviewForm() {
    this.reviewForm.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Add focus to textarea after scroll
    setTimeout(() => {
      const textarea = this.reviewForm.nativeElement.querySelector('textarea');
      if (textarea) {
        textarea.focus();
      }
    }, 500);
  }

  submitReview() {
    if (!this.userTextReview || this.userTextReview.trim() === '') {
      return;
    }
  }

  updateReviewText($event: HTMLTextAreaElement) {
    this.userTextReview = $event.value;
  }

  updateUserRating(star: number) {
    this.userRating = star;
  }
}
