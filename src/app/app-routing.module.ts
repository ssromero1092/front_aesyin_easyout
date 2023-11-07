import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from '@angular/core';
import { RegisterComponent } from "./components/register/register.component";

const routes : Routes = [
  { path: '', component: LoginComponent },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "register", component: RegisterComponent, pathMatch: "full" },
  { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)},
  { path: '**', redirectTo: '' }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
