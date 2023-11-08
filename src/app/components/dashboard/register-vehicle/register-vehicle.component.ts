import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent {
  loading = false;
  constructor(
    public userService: UsersService,
    public vehicleService: VehicleService,
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    const {plate,brand,model} = form.value;

    const idClient = this.userService.getidClient()
    console.log({
      plate,
      brand,
      model,
      idClient

    });


    this.vehicleService.createVehicle({
      plate,
      brand,
      model,
      idClient

    }).subscribe((res) => {
      console.log(res);

        this.openSnackBar('vahiculo se registro correctamente', '');

    },
      (e) => {
        this.openSnackBar(e.error.detail, '');
      });




  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
