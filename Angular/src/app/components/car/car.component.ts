import { Component, Inject } from '@angular/core';
import { CarServiceService } from '../../services/car-service.service';
import { CarModule } from '../../module/car.module';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { SnackBarService } from '../../services/snack-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {
  // two way binding


  AddCarForm: FormGroup;
  errorMsg: any;

  constructor(
    private carservice: CarServiceService,
    private _dialogRef: MatDialogRef<CarComponent>,
    private _fb: FormBuilder,
    private _snackBarService: SnackBarService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
    //that could be in ngOnInit()
    this.AddCarForm = this._fb.group({
      hp: '',
      model: '',
      marque: '',
    })
    //update
    this.AddCarForm.patchValue(this.data);
  }

  //event bindding
 /* OnFormSave() {
    console.log("click!!!!1");
    let mycar = new CarModule();
    mycar.id_car = 0;
    mycar.hp = this.hp;
    mycar.model = this.model;
    mycar.marque = this.marque;
    console.log(mycar);
    this.carservice.saveCare(mycar).subscribe({
      next:(val: any)=>{
        this._dialogRef.close();
      },
      error:(err: any)=>{
        console.log(err);
      },
    });
    this._dialogRef.close();
    this._snackBarService.openSnackBar("Car created successfully");
  } */

  OnFormSave(){
    if(this.AddCarForm)
    {
      this.carservice.saveCare(this.AddCarForm.value).subscribe({
        next:(val: any)=>{

          this._dialogRef.close();
        },
        error:(err: any)=>{
          console.log(err);
        },
      })
    }
  } 

   

}
