import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavinComponent } from './navin.component';

describe('NavinComponent', () => {
  let component: NavinComponent;
  let fixture: ComponentFixture<NavinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
