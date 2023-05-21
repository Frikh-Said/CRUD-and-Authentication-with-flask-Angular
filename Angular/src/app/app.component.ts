import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarService } from './services/snack-bar.service';
import { CarComponent } from './components/car/car.component';
import { CarsComponent } from './components/cars/cars.component';
import { SigneUpComponent } from './components/signe-up/signe-up.component';
import { LoginComponent } from './components/login/login.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD';

  constructor(
    private _AddCar: MatDialog,
    private _DisplayCars: MatDialog,
    private _snackBarService: SnackBarService,
    private _SigneUp: MatDialog,
    private _Login: MatDialog,
  ) { }

  openAddCarForm() {
    this._AddCar.open(CarComponent, { width: '500px', disableClose: false })
  }

  openDisplayCarsForm() {
    this._DisplayCars.open(CarsComponent, { width: '1000px', height: '700px', disableClose: false })
  }

  openSigneUpForm() {
    this._SigneUp.open(SigneUpComponent, { width: '500px', disableClose: false });
  }

  openLoginForm() {
    this._Login.open(LoginComponent, { width: '500px', disableClose: false });
  }

  logout(){
    localStorage.clear();
  }

}
