import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddblogpageComponent } from './addblogpage.component';

describe('AddblogpageComponent', () => {
  let component: AddblogpageComponent;
  let fixture: ComponentFixture<AddblogpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddblogpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddblogpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
