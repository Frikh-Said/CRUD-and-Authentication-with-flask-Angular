import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component';
import { CarComponent } from './components/car/car.component';
import { SigneUpComponent } from './components/signe-up/signe-up.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: "addcar", component: CarComponent,canActivate:[AuthGuard]},
  { path: "cars", component: CarsComponent },
  { path: "login", component: LoginComponent },
  { path: "signe-up", component: SigneUpComponent },
  { path: "", component: CarsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
