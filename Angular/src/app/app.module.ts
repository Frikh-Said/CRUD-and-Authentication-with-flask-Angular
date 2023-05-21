import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './car/car.component';
import { CarsComponent } from './cars/cars.component';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    CarsComponent,
    LoginComponent,
  ],
  imports: [    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatFormFieldModule,     //pour importer des modules 
    MatPaginatorModule,
  ],
  providers: [],    //pour declarer les services
  bootstrap: [AppComponent]   //pour specifier qu'il est le root component
})
export class AppModule { }
