import { CarServiceService } from '../services/car-service.service';
import { CarModule } from '../../module/car.module';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent {

    displayedColumns: string[] = ['id_car', 'model', 'hp', 'marque'];
    dataSource!:CarModule[] ;

  // cars!:CarModule[];


  constructor(private myservice:CarServiceService){
    this.myservice.getAllcars().subscribe(

      (data: CarModule[]) => {
        console.log(data);
        this.dataSource = data;
      },
  
    );
  }


}

