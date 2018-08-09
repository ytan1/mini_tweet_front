import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  private url:string = 'localhost:8000'
  public upload(files: Set<File>): {[key:string]: Object} {

      const status = {};
      files.forEach(file => {
          let fd = new FormData();
          fd.append('file', file, file.name);
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
                       
                   }
               });
           })
           
           status[file.name]['response'] = promise;
           status[file.name]['progess'] = progress.asObservable();
           
           //return observables

      }) 
      return status;
  }
}
