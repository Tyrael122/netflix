import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimilarTabComponent } from './similar-tab.component';

describe('SimilarTabComponent', () => {
  let component: SimilarTabComponent;
  let fixture: ComponentFixture<SimilarTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimilarTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimilarTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
