import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  private openDropdownId: string | null = null;

  constructor() {}

}
