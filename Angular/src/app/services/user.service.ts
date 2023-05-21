import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../module/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   // url principal 
   url: string = "http://127.0.0.1:5000";
   httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   };

  constructor(private http:HttpClient) {}

  addUser(user: AppUser): Observable<any>
  {
    console.log(this.url + "/register");
    return this.http.post(this.url + "/register", user, this.httpOptions);
   } 
}
