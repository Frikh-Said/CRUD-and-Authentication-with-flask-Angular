import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackBarService } from '../../services/snack-bar.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signe-up',
  templateUrl: './signe-up.component.html',
  styleUrls: ['./signe-up.component.css']
})
export class SigneUpComponent {
  SigneUpForm: FormGroup;
  hide = true;

  constructor(
    private _fb: FormBuilder ,  
    private _userService: UserService, 
    private _dialogRef: MatDialogRef<SigneUpComponent>,
    private _snackBarService: SnackBarService,
    private _Login: MatDialog,
    ){
    this.SigneUpForm = this._fb.group({
      username: '',
      password: '',
    })
  }
 
  OnFormSubmit(){
    if(this.SigneUpForm.valid)
    {
      this._userService.addUser(this.SigneUpForm.value).subscribe({
        next:(val: any)=>{
          this._dialogRef.close();
        },
        error:(err: any)=>{
          console.log(err);
        },
      })
    }
  }

  openLoginForm() {
    this._Login.open(LoginComponent, { width: '500px', disableClose: false });
  }
}

 