import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmDialogBlogComponent } from './delete-confirm-dialog-blog.component';

describe('DeleteConfirmDialogBlogComponent', () => {
  let component: DeleteConfirmDialogBlogComponent;
  let fixture: ComponentFixture<DeleteConfirmDialogBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteConfirmDialogBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteConfirmDialogBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
