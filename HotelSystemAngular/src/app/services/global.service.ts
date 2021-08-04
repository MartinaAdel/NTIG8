import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public loginFlag = false
  commonUrl = `http://localhost:3000/`
  
  constructor(private _http:HttpClient) { }
  login(user:any):Observable<any>{
    return this._http.post(`${this.commonUrl}user/login`, user)
  }
  me():Observable<any>{
    return this._http.post(`${this.commonUrl}me`,null)
  }
}
