import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
