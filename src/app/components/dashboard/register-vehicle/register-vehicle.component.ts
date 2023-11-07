import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';

@Component({
  selector: 'app-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.css']
})
export class RegisterVehicleComponent {
  loading = false;
  constructor(
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    console.log(form.value);

  }



}
