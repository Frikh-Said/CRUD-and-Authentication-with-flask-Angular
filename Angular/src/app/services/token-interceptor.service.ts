import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    let authservice=this.inject.get(LoginService);
    let jwtToken=req.clone({
      setHeaders:{
        Authorization:'Bearer '+authservice.GetToken()
      }
    });
    return next.handle(jwtToken);
  }

  constructor(private inject:Injector) { }
}
