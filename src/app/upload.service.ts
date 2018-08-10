import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }
  //api url
  private url:string = 'http://localhost:8000/api/file';
  //upload pic
  public upload(files: Set<File>): {[key:string]: Object} {

      const status = {};
      files.forEach(file => {
          let fd = new FormData();
          fd.append('file', file);   //laravel: $request->file('file')
          const req = new HttpRequest('POST', this.url, fd, {reportProgress: true});

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
