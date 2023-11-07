import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {

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
