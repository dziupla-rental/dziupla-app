import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
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
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner.service';

export interface DialogData {
  username: string;
  role: string;
}
@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginViewComponent implements OnInit {
  form = this._fb.group({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  isLoggedIn = false;
  isLoginFailed = false;

  errorMessage = '';
  roles: string[] = [];

  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly _authService: AuthService,
    private readonly _storageService: StorageService,
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _dialog: MatDialog,
    private readonly _spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    if (this._storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this._storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    this._authService
      .login(
        this.form.controls.username.value!,
        this.form.controls.password.value!
      )
      .subscribe({
        next: (data) => {
          this._storageService.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this._storageService.getUser().roles;
          this.openDialog();
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this._snackBar.open('Błąd Logowania: ' + this.errorMessage, '❌');
        },
      });
  }

  openDialog(): void {
    const dialogRef = this._dialog.open(SuccessfulLoginDialog, {
      data: { username: this.form.controls.username.value },
    });

    dialogRef.afterClosed().subscribe(() => {
      this._dialog.closeAll();
    });
  }

  onHomeClick(): void {
    this._router.navigate(['/']).then(() => {});
  }
}

@Component({
  selector: 'successful-login-dialog',
  templateUrl: 'successful-login-dialog.html',
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
export class SuccessfulLoginDialog {
  constructor(
    private readonly _dialogRef: MatDialogRef<SuccessfulLoginDialog>,
    private readonly _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this._dialogRef.close();
    // Forcing a refresh. to see the logout buttons
    this._router.navigate(['/']).then(() => {window.location.reload();});
  }
}
