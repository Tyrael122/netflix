import {Component, input} from '@angular/core';
import console from 'node:console';

@Component({
  selector: 'netflix-icon',
  templateUrl: './netflix-icon.component.html',
  styleUrl: './netflix-icon.component.css',
})
export class NetflixIconComponent {
  name = input.required<string>()
  size = input<string | number>('24px');
  fill = input<string>('none')
  protected readonly console = console;
}
