import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {Router} from "@angular/router";

export interface DialogData {
  username: string;
}

@Component({
  selector: 'app-register-view',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register-view.component.html',
  styleUrl: './register-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterViewComponent {
  form: any = {
    username: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.openDialog();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this._snackBar.open('Błąd rejestracji: ' + this.errorMessage, '❌');
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SuccessfulRegistrationDialog, {
      data: { username: this.form.username },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.dialog.closeAll();
    });
  }
}

@Component({
  selector: 'successful-registration-dialog',
  templateUrl: 'successful-registration-dialog.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class SuccessfulRegistrationDialog {
  constructor(
    public dialogRef: MatDialogRef<SuccessfulRegistrationDialog>,
    private readonly _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    this._router.navigate(['/login']).then(() => {});
  }
}
