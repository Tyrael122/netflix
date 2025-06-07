import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarContainerComponent} from './navbar-container.component';

describe('NavbarContainerComponent', () => {
  let component: NavbarContainerComponent;
  let fixture: ComponentFixture<NavbarContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
