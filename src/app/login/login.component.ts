import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {AuthService} from '../auth.service';
import {TokenService} from '../token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error = []
  public form1 = {
    email:null,
    password: null
  }
  public form2 = {
    email:null,
    name:null,
    password: null,
    password_confirmation: null
  }
  constructor(private auth:AuthService,
              private token:TokenService,
              private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    this.auth.login(this.form1).subscribe(
        data => {
          //bug: "access_token doesn't exist on Object"
          this.token.set(data.access_token)
          //console.log(this.token.isValid())
          this.auth.changeStatus();
          this.router.navigateByUrl('/dashboard');

        },
        error => this.handleError(error)
      )
  }
  onSubmitRegister(){
    this.auth.register(this.form2).subscribe(
        data => {
          this.token.set(data.access_token)
          this.auth.changeStatus();
          this.router.navigateByUrl('/dashboard');
        },
        error => {
          this.handleError(error)
    })
  }

  handleError(error){
    this.error = error.error
  }

  

  //use some jquery for animation ...
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
