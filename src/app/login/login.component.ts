import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showLogin(event: any): void{
       $("#login-form").delay(100).fadeIn(100);
       $("#register-form").fadeOut(100);
       $('#register-form-link').removeClass('active');
       $(event.target).addClass('active');
       event.preventDefault();
  }
  showRegister(event: any){
      $("#register-form").delay(100).fadeIn(100);
      $("#login-form").fadeOut(100);
      $('#login-form-link').removeClass('active');
      $(event.target).addClass('active');
      event.preventDefault();
  }
}
