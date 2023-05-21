import { AppUser } from '../module/user.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
   // url principal 
   url: string = "http://127.0.0.1:5000";
   httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
   }

  users: AppUser[] = [];
  authenticatedUser!: AppUser;

  constructor(private http: HttpClient) {}

  public login(username:string, password:string): Observable<any> {
    return this.http.post(this.url + "/login", {username, password}, this.httpOptions);
  }
/*
  public authenticateUser(token:string):Observable<boolean>{
    localStorage.setItem("acces_token", token);
    return of(true);
  }

  public getToken():string|null{
    return localStorage.getItem("acces_token");

  }

  public isAuthenticated():boolean{
    return !!this.getToken();
  }*/

  IsLogedIn(){
    return localStorage.getItem('token')!=null;
  }

  GetToken(){
    return localStorage.getItem('token')||'';
  }

}
