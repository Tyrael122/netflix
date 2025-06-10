import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOptionsButtonComponent } from './movie-options-button.component';

describe('MovieOptionsButtonComponent', () => {
  let component: MovieOptionsButtonComponent;
  let fixture: ComponentFixture<MovieOptionsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieOptionsButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieOptionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
