import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private url:string = 'http://localhost:8000/api/article'
  constructor(private httpClient: HttpClient) { }

  create(content:string, uris:string): Promise<any>{
      console.log(content)
      const req = new HttpRequest('POST', this.url, {content: content, uris: uris})
      const promise = new Promise((resolve, reject) => {
          this.httpClient.request(req).subscribe( event => {
              if(event instanceof HttpResponse){
                  resolve(event);
              }
          }, err =>{
              reject(err);
          })
      })
      return promise; 
  }
}
