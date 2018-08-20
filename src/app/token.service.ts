import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private serverUrl:String[] = [
      "http://localhost:8000/api/login",
      "http://localhost:8000/api/register"
  ]
  constructor() { }

  set(token){
      localStorage.setItem('token_mt', token);
  }

  get(){
      return localStorage.getItem('token_mt');
  }

  remove(){
      localStorage.removeItem('token_mt');
  }

  isValid(){
      //get the middle part of the token
      if(!this.get()) return false;
      const token = this.get().split('.')[1];
      //decode
      const token1 = JSON.parse(atob(token));
      if(!token1) return false;
      //now token1 is an object, check iss property
      return this.serverUrl.indexOf(token1.iss) > -1;
  }
}
