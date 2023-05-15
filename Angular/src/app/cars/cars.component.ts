import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { CarServiceService } from '../services/car-service.service';
import { CarModule } from 'src/module/car.module';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {

  cars!:CarModule[];


  constructor(private myservice:CarServiceService){
    this.myservice.getAllcars().subscribe(
  
        (data)=>{
  
          this.cars = data;
        }
  
  
    );
  }

}
