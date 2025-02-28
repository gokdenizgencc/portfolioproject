import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateblogComponent } from './updateblog.component';

describe('UpdateblogComponent', () => {
  let component: UpdateblogComponent;
  let fixture: ComponentFixture<UpdateblogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateblogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
