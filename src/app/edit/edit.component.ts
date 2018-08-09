import { Component, OnInit, ViewChild } from '@angular/core';
import {UploadService} from '../upload.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @ViewChild('file') fileInput;
  private uploading: boolean = false;
  private url:string[] = [];
  private hostname:string = 'localhost:'
  // private promises: Set<Promise<any>>;
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

  addFile(){
      this.fileInput.nativeElement.click();
  }
  checkUploadFile(){
      if(this.url.length >= 5){
          alert('5 pics for max');
      }else{
          this.uploadFile();
      }
  }
  uploadFile(){
        const responses = this.uploadService.upload(this.fileInput.nativeElement.files);
        this.uploading = true;
        let promises = [];

        for(let key in responses){
            promises.push(responses[key]['response'])
        }

        Promise.all(promises).then(res => {
            this.uploading = false;

            res.forEach(body => {
                this.url.push(this.hostname + body.uri);
            },
            err => {
               console.log(`error uploading, ${err}`);
            });

        })

  }
}
