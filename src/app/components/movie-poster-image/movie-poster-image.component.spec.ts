import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MoviePosterImageComponent} from './movie-poster-image.component';

describe('MoviePosterImageComponent', () => {
  let component: MoviePosterImageComponent;
  let fixture: ComponentFixture<MoviePosterImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviePosterImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviePosterImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
