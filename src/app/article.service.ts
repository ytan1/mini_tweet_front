import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import {TokenService} from './token.service';
import {AuthService} from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url:string = 'http://localhost:8000/api/article'
  constructor(private httpClient: HttpClient, private token:TokenService, private auth: AuthService) { }

  //create new article
  create(content:string, uris:string): Promise<any>{

      let user_id = 0, name = 'Anonymous';
      //check if logged in 
      if(this.token.isValid()){
        //create headers for jwt authentication
        const token = this.token.get();
        let header:HttpHeaders = new HttpHeaders({
              'Authorization': `Bearer ${token}`
        });
         
        return new Promise((resolve,reject) => {
          this.auth.me(header).subscribe(res => {
              console.log(res)
              user_id = res.id;
              name = res.name;
              this.reqForCreate(content, uris, user_id, name).subscribe(_=>resolve(), err=>reject(err));
          },
          err => reject(err));
        })
        
      }else{
        return new Promise((resolve,reject) => {
              this.reqForCreate(content, uris, user_id, name).subscribe(_=>resolve(), err=>reject(err));
              })
      }
  }
  //a helper method
  reqForCreate(content, uris, user_id, user_name){
    const req = new HttpRequest('POST', this.url, {content, uris, user_id, user_name})
    const obs = this.httpClient.request(req)
    return obs;
    
  }
  //get all articles
  getAll(){
    const req = new HttpRequest('GET', this.url)
    //use observable this time?
    return this.httpClient.request(req)
  }
}
