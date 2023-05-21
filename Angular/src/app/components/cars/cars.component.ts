import { CarServiceService } from '../../services/car-service.service';
import { CarModule } from '../../module/car.module';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CarComponent } from '../car/car.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})

export class CarsComponent {

    displayedColumns: string[] = ['id_car', 'model', 'hp', 'marque', 'actions'];
    dataSource!:CarModule[] ;

  // cars!:CarModule[];


  constructor(private myservice:CarServiceService , private _UpdateCar:MatDialog){
    this.myservice.getAllcars().subscribe(

      (data: CarModule[]) => {
        console.log(data);
        this.dataSource = data;
      },
  
    );
  }

  delete(id_car:number){
    this.myservice.deleteCar(id_car).subscribe({
      next: (res)=>{
        console.log(id_car);
      },
      error: console.log,
    });
  }

  update(data:any){
      this._UpdateCar.open(CarComponent, { data });
  }


}

