import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { MainComponent } from './main/main.component';
const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: MainComponent,
        children: [
            { path: '', component: DashboardComponent},
            { path: 'edit', component: EditComponent},
            { path: '**', redirectTo: ''}
        ]
    },
    { path: 'login', component: LoginComponent }
];
@NgModule({
  imports:[
      RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
