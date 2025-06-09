import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlaterButtonComponent } from './watchlater-button.component';

describe('WatchlaterButtonComponent', () => {
  let component: WatchlaterButtonComponent;
  let fixture: ComponentFixture<WatchlaterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlaterButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlaterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
