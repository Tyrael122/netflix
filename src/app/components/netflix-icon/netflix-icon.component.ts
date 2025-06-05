import {Component, Input} from '@angular/core';

@Component({
  selector: 'netflix-icon',
  templateUrl: './netflix-icon.component.html',
  styleUrl: './netflix-icon.component.css',
})
export class NetflixIconComponent {
  @Input() name: string = '';
  @Input() size: string | number = "24";
  @Input() iconClass: string = '';
  @Input() fill: string = '';
}
