import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TokenService} from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8000/api';
  private isLogin:BehaviorSubject<boolean> = new BehaviorSubject(this.token.isValid()); 
  //can be checked in the main component(header)
  public status = this.isLogin.asObservable();


  constructor(private http:HttpClient,
              private token:TokenService
      ) { }

  login(form){
      return this.http.post(`${this.url}/login`, form);
  }
  register(form){
      return this.http.post(`${this.url}/register`, form);
  }

  //called in other components to check if there is jwt in localStorage 
  changeStatus(){
      this.isLogin.next(this.token.isValid());
  }

  logout(){
      //to do tell back end
      const token = this.token.get();
      let headers:HttpHeaders = new HttpHeaders({
            'Authorization': `Bearer ${token}`
      });
      this.http.get(`${this.url}/logout`, {headers}).subscribe(_ =>{
        this.token.remove();
        this.changeStatus();
        alert("Log out success.");
      },
      err => console.log(err))
      
  }

  me(headers){
    return this.http.get(`${this.url}/me`, {headers})
  }
}
