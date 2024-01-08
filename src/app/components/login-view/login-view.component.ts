import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MAT_DIALOG_DATA, MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

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
  form: any = {
    username: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private storageService: StorageService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.openDialog();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this._snackBar.open('Błąd Logowania: '+this.errorMessage, '❌');
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SuccessfulLoginDialog, {
      data: {username: this.form.username},
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.dialog.closeAll();
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
  home(): void {
    window.location.href = '/';
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
    public dialogRef: MatDialogRef<SuccessfulLoginDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    window.location.href = '/';
  }
}
