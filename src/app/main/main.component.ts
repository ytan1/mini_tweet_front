import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private isEdit: boolean = false;

  constructor(router: Router) { 
      // this.isEdit = router.url.indexOf('/dashboard/edit') > -1;
      router.events.subscribe( (event: Event) => {

                  if (event instanceof NavigationStart) {
                      // Show loading indicator
                  }

                  if (event instanceof NavigationEnd) {
                      // Hide loading indicator
                      this.isEdit = router.url.indexOf('/dashboard/edit') > -1;
                  }

                  if (event instanceof NavigationError) {
                      // Hide loading indicator
                      // Present error to user
                      console.log(event.error);
                  } 
                });
  }

  ngOnInit() {
  }

}
