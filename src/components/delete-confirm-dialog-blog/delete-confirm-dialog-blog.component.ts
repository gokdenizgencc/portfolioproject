import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'delete-confirm-dialog-blog', 
  template: `
    <div class="dialog-container">
      <h2 class="dialog-title">
        <span class="warning-icon"></span> Bloğu Silmek İstiyor Musunuz?
      </h2>
      <p class="dialog-text">
        Bu işlemi geri alamazsınız. Silmek istediğinizden emin misiniz?
      </p>
      <div class="dialog-buttons">
        <button mat-button class="cancel-btn" (click)="onCancel()">Vazgeç</button>
        <button mat-button color="warn" class="confirm-btn" (click)="onConfirm()">Sil</button>
      </div>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        min-width: 480px;
        padding: 30px;
        border-radius: 12px;
        background: linear-gradient(135deg, #f9f9f9, #ffffff);
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transition: transform 0.2s ease-in-out;
      }

      .dialog-title {
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .warning-icon {
        font-size: 1.6rem;
        color: #d32f2f;
      }

      .dialog-text {
        font-size: 1rem;
        color: #555;
        margin-bottom: 20px;
      }

      .dialog-buttons {
        display: flex;
        justify-content: center;
        gap: 16px;
        width: 100%;
      }

      .cancel-btn, .confirm-btn {
        flex: 1;
        padding: 12px;
        font-size: 1rem;
        font-weight: bold;
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      .cancel-btn {
        background-color: #e0e0e0;
        color: #333;
      }

      .cancel-btn:hover {
        background-color: #d6d6d6;
        transform: scale(1.05);
      }

      .confirm-btn {
        background: linear-gradient(135deg, #f44336, #d32f2f);
        color: white;
      }

      .confirm-btn:hover {
        background: linear-gradient(135deg, #d32f2f, #b71c1c);
        transform: scale(1.05);
      }
    `,
  ],
})
export class DeleteConfirmDialogBlog {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmDialogBlog>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
