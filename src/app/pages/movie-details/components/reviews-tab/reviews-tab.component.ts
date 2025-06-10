import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NetflixIconComponent} from '../../../../components/netflix-icon/netflix-icon.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'netflix-reviews-tab',
  imports: [
    NetflixIconComponent,
    FormsModule
  ],
  templateUrl: './reviews-tab.component.html',
  styleUrl: './reviews-tab.component.css'
})
export class ReviewsTabComponent {

  @Input() userRating: number = 4;
  @Input() ngModel: any;
  @Output() ngModelChange = new EventEmitter<any>();
  @Input() submitReview: () => void = () => {};
  reviews: any[] = [];
}
