import {Directive, ElementRef, HostListener, inject} from '@angular/core';

@Directive({
  selector: '[netflixSingleDropdownOpen]',
  exportAs: 'netflixSingleDropdownOpen',
})
export class SingleDropdownOpenDirective {
  private static openDropdown: SingleDropdownOpenDirective | null = null;

  isOpen = false;

  el = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.close();
    }
  }

  toggle($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    if (SingleDropdownOpenDirective.openDropdown === this) {
      this.close();
    } else {
      if (SingleDropdownOpenDirective.openDropdown) {
        SingleDropdownOpenDirective.openDropdown.close();
      }
      this.open();
    }
  }

  private open() {
    this.isOpen = true;
    SingleDropdownOpenDirective.openDropdown = this;
  }

  close($event?: MouseEvent) {
    $event?.preventDefault();
    $event?.stopPropagation();

    this.isOpen = false;
    if (SingleDropdownOpenDirective.openDropdown === this) {
      SingleDropdownOpenDirective.openDropdown = null;
    }
  }
}
