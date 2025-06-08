import {Component, input} from '@angular/core';

@Component({
  selector: 'netflix-loading-spinner-indicator',
  imports: [],
  templateUrl: './loading-spinner-indicator.component.html',
  styleUrl: './loading-spinner-indicator.component.css'
})
export class LoadingSpinnerIndicatorComponent {
  caption = input<string>();

}
