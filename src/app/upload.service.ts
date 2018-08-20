import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import {TokenService} from './token.service';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient,
              private token: TokenService
    ) { }
  //api url
  private url:string = 'http://localhost:8000/api/file';
  //upload pic
  public upload(files: Set<File>): {[key:string]: Object} {

      const status = {};
      files.forEach(file => {
          let fd = new FormData();
          fd.append('file', file);   //laravel: $request->file('file')
          //create headers for jwt authentication
          const token = this.token.get();
          let header:HttpHeaders = new HttpHeaders({
                'Authorization': `Bearer ${token}`
            });
          
          //headerName.append('Authorization', `Bearer ${token}`); cannot append because header is immutable?
          const req = new HttpRequest('POST', this.url, fd, {headers: header, reportProgress: true });

           const progress = new Subject<number>();
           const promise = new Promise((resolve, reject) => {
               this.httpClient.request(req).subscribe(event => {
                   if(event.type === HttpEventType.UploadProgress){
                       const percentDone = Math.round(100 * event.loaded / event.total);

                        // pass the percentage into the progress-stream
                        progress.next(percentDone);
                   }else if (event instanceof HttpResponse){
                       progress.complete();
                       //the returned url from server is here
                       if(event.status == 200){
                           resolve(event.body)
                       }else{
                           reject(event.body)
                       }
                       
                   }else if(event instanceof HttpErrorResponse){
                     reject(event.error.error)
                   }
               });
           })
           status[file.name] = {};
           status[file.name]['response'] = promise;
           status[file.name]['progess'] = progress.asObservable();
           
           //return observables

      }) 
      return status;
  }
  //delete pic
  delete(uri:string): Observable<any>{
    const req = new HttpRequest('DELETE', this.url, {params: `path=${uri}`});
    return this.httpClient.request(req);
  }
}
