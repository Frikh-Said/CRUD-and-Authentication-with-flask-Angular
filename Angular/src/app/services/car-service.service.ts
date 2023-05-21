import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarModule } from '../module/car.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  // url principal 
  url:string = "http://127.0.0.1:5000";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http:HttpClient) { }

 
  saveCare(car:CarModule): Observable<any>
  {
    return this.http.post(this.url+"/savecar" , car , this.httpOptions );

  }
  getAllcars():Observable<CarModule[]>{

     return  this.http.get<CarModule[]>(this.url+"/cars" ,this.httpOptions );
  }

  deleteCar(id_car:number):Observable<any>{
    console.log(id_car);
    return this.http.delete<CarModule[]>(this.url + '/deletecar/'+id_car, this.httpOptions);
  }

  updateCar(id_car:number,data:any):Observable<CarModule[]>{
    return this.http.put<CarModule[]>(this.url + '/updatecar/'+id_car, this.httpOptions);
  }




}
