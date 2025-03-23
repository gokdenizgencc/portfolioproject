import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'delete-confirm-dialog-blog', 
  template: `
  <div class="dialog-container">
  <div class="dialog-icon">
    <i class="fas fa-exclamation-triangle"></i>
  </div>
  <h2 class="dialog-title">Bloğu Silmek İstiyor Musunuz?</h2>
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
    :root {
  --primary-color: #000;
  --danger-color: #FF3B30;
  --danger-hover: #E02E24;
  --neutral-light: #F2F2F7;
  --neutral-dark: #8E8E93;
  --text-primary: #1C1C1E;
  --text-secondary: #6C6C70;
  --border-radius: 16px;
  --button-radius: 12px;
  --transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.dialog-container {
  width: 420px;
  padding: 32px;
  border-radius: var(--border-radius);
  background-color: white;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: var(--transition);
  overflow: hidden;
}

.dialog-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  background-color: rgba(255, 59, 48, 0.1);
  border-radius: 50%;
  margin-bottom: 24px;
}

.dialog-icon i {
  font-size: 28px;
  color: var(--danger-color);
}

.dialog-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.dialog-text {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-secondary);
  margin: 0 0 32px 0;
  max-width: 360px;
}

.dialog-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;
}

.cancel-btn, .confirm-btn {
  flex: 1;
  padding: 14px 0;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: var(--button-radius);
  cursor: pointer;
  transition: var(--transition);
  outline: none;
}

.cancel-btn {
  background-color: var(--neutral-light);
  color: var(--text-primary);
}

.cancel-btn:hover {
  background-color: #E5E5EA;
  transform: translateY(-2px);
}

.confirm-btn {
  background-color: var(--danger-color);
  color: black;
}

.confirm-btn:hover {
  background-color: #E5E5EA;
  transform: translateY(-2px);
}

.cancel-btn:active, .confirm-btn:active {
  transform: translateY(1px);
}




@media (max-width: 480px) {
  .dialog-container {
    width: 100%;
    padding: 24px 20px;
  }
  
  .dialog-buttons {
    flex-direction: column;
  }
  
  .cancel-btn, .confirm-btn {
    padding: 16px 0;
  }
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
