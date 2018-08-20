import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

import { ArticleService } from '../article.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //for fa icon in template
  private faThumbsUp = faThumbsUp;
  private faThumbsDown = faThumbsDown;
  private articles: Object[];
  private imgHost:String = "http://localhost:8000/storage/"
  constructor(private article: ArticleService, private _sanitizer: DomSanitizer, private route: ActivatedRoute) { 
      
  }

  ngOnInit() {
      setTimeout(()=>this.load(),100)
      
  }


  load(){
      this.article.getAll().subscribe(
          res => {
              if(res instanceof HttpResponse){
                  console.log(res.body)
                  this.handleArticles(res.body)

              }
              
            },
          err => console.log(err)
      )
  }

  handleArticles(data){
      data.sort((a,b)=>
              Date.parse(b.created_at) - Date.parse(a.created_at))

      data.forEach(c => {
          c.uriArr = [];
          if(c.uris){
              c.uriArr = c.uris.split(',')
          }     
      })
      this.articles = data
  }




  //unsafe url convert
  getBackground(image) {
    let sanitizedUrl = this._sanitizer.bypassSecurityTrustResourceUrl(this.imgHost + image);
    return sanitizedUrl;
  }
}
