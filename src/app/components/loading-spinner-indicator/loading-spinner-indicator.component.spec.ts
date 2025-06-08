import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSpinnerIndicatorComponent } from './loading-spinner-indicator.component';

describe('LoadingSpinnerIndicatorComponent', () => {
  let component: LoadingSpinnerIndicatorComponent;
  let fixture: ComponentFixture<LoadingSpinnerIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerIndicatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
