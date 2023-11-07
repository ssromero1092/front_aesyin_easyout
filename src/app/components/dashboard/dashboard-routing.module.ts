import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterCardComponent } from './register-card/register-card.component';
import { RegisterVehicleComponent } from './register-vehicle/register-vehicle.component';

const routes: Routes = [
    { path: '', component: DashboardComponent, children:[
        { path:'',component: InicioComponent },
        { path:'dashboard',component: InicioComponent },
        { path:'registercard',component: RegisterCardComponent },
        { path:'registervehicle',component: RegisterVehicleComponent },

    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}

