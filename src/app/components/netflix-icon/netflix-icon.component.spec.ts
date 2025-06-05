import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetflixIconComponent } from './netflix-icon.component';

describe('NetflixIconComponent', () => {
  let component: NetflixIconComponent;
  let fixture: ComponentFixture<NetflixIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetflixIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetflixIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
