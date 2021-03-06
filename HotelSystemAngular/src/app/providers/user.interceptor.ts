import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from '../services/global.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private _global:GlobalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token')
    if(token){
      this._global.loginFlag=true
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
    }
    return next.handle(request);
  }
}
