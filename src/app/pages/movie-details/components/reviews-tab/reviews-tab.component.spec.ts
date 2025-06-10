import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsTabComponent } from './reviews-tab.component';

describe('ReviewsTabComponent', () => {
  let component: ReviewsTabComponent;
  let fixture: ComponentFixture<ReviewsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
