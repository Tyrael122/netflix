import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NetflixIconComponent} from '../../../../components/netflix-icon/netflix-icon.component';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
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

  @Input() userRating: number = 4;
  userTextReview: any;
  @Output() ngModelChange = new EventEmitter<any>();
  @Input() submitReview: () => void = () => {};
  reviews: Review[] = [
    {
      id: '1',
      author: 'Alice',
      rating: 5,
      content: 'Absolutely loved this movie! The story and visuals were amazing.',
      created_at: '2024-06-01T14:23:00Z'
    },
    {
      id: '2',
      author: 'Bob',
      rating: 4,
      content: 'Great performances and direction. Worth watching.',
      created_at: '2024-06-02T10:15:00Z'
    },
    {
      id: '3',
      author: 'Charlie',
      rating: 3,
      content: 'It was entertaining, but the pacing was a bit slow in the middle.',
      created_at: '2024-06-03T18:45:00Z'
    }
  ]
}
