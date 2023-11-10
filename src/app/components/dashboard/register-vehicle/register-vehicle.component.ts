import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent {
  loading = false;
  displayedColumns: string[] = ['plate', 'brand', 'model', 'actions'];
  data: any[] = [];
  idClient = this.userService.getidClient()
  openregister = false;
  constructor(
    public userService: UsersService,
    public vehicleService: VehicleService,
    public snackBar: MatSnackBar,
    private router: Router,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.list()
    setTimeout(() => {
      this.loading = false;
    }, 1500);

  }

  onSubmit(form: NgForm): void {
    const {plate,brand,model} = form.value;
    this.vehicleService.createVehicle({
      plate,
      brand,
      model,
      fkIdClient:this.idClient

    }).subscribe((res) => {
      form.resetForm()
        this.openregister=false
        this.list()
        this.openSnackBar('The vehicle was successfully registered.', '');

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


  list(){
    Promise.all([
      this.vehicleService.getVehiclebyClient(this.idClient).toPromise(),
    ]).then((res:any) => {
      this.data = res[0]['status'] === 200 ? res[0]['body']['data'] : [];
      console.log(this.data);

    });
  }

  deleteRow(row: any) {
    const idVehicle=row.idVehicle;
    this.vehicleService.delVehiclebyId(idVehicle).subscribe((res)=>{
      this.list()
      this.openSnackBar('The vehicle was successfully removed.', '');
    },(e) => {
      this.openSnackBar(e.error.detail, '');
    });
  }

  openRegister() {

    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.openregister=true
    }, 1500);

  }

  closeRegister() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.openregister=false
    }, 1500);
  }

}
