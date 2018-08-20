import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {UploadService} from '../upload.service';
import {ArticleService} from '../article.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  @ViewChild('file') fileInput;
  @ViewChild('content') contentInput;
  private uploading: boolean = false;
  private uris:string = '';
  private urlArr:string[] = [];
  private uriArr:string[] = [];
  private hostname:string = 'http://localhost:8000/storage/';
  // private example:string = 'http://source.ytan1mall.com/resourse/floor1-3.jpg';
  // private promises: Set<Promise<any>>;
  constructor(private uploadService: UploadService, private articleService: ArticleService, private router:Router, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  addFile(){
    if(this.urlArr.length >= 5){
        alert('5 pics for max');
        return;
    }else if(this.uploading){
      alert('Is uploading...');
      return;
    }
    else{
        this.fileInput.nativeElement.click();
    }
      
  }
  checkUploadFile(){
      if(this.urlArr.length >= 5){
          alert('5 pics for max');
          return;
      }else if(this.uploading){
        alert('Is uploading...');
        return;
      }
      else{
          this.uploadFile();
      }
  }
  uploadFile(){
        const originFiles = this.fileInput.nativeElement.files;

        let files:Set<File> = new Set();
        for(let key in originFiles){
          if(originFiles.hasOwnProperty(key)){
            files.add(originFiles[key]);
          }
        }

        const responses = this.uploadService.upload(files);
        this.uploading = true;
        let promises = [];

        for(let key in responses){
            promises.push(responses[key]['response'])
        }

        Promise.all(promises).then(res => {
            this.uploading = false;

            res.forEach(body => {
              this.urlArr.push(this.hostname + body.uri);
              this.uriArr.push(body.uri);
              this.joinUris();
            })},
            err => {
                this.uploading = false;
               console.log(`error uploading, ${err}`);
            });
  }
  joinUris(){
    this.uris = this.uriArr.join(',');
  }
  deleteFile(url:string){
    const index = this.urlArr.indexOf(url);
    this.uploadService.delete(this.uriArr[index]).subscribe(_ => {
      //delete the url in the url Arr
      this.urlArr.splice(index, 1);
      this.uriArr.splice(index, 1);
      this.joinUris();

    },
      err => {console.log(err)}
    )
  }

  createArticle(){
    const content = this.contentInput.nativeElement.value;
    this.articleService.create(content, this.uris).then(res => {
      //create article success
      this.router.navigateByUrl('/dashboard');
    }, err => {
      console.log(err);
      this.router.navigateByUrl('/dashboard');
    });

  }





  //unsafe url convert
  getBackground(image) {
    let sanitizedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(image);
    return sanitizedUrl;
  }
}
