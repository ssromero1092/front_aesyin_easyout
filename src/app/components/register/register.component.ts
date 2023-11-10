import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  loading = false;

  user = {
    typeDocument: '',
    document: '',
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    password: '',
    confPassword: '',
    phone: '',
    address: '',
  };

  constructor(
    private router: Router,
    public userService: UsersService,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    const { typeDocument, document, firstName, lastName, email, password, confPassword, phone, address, } = form.value;
    if (
      !typeDocument ||
      !document ||
      !password ||
      !confPassword
    ) {
      this.openSnackBar('Please complete all required fields', '');
    } else if (password !== confPassword) {
      this.openSnackBar('Passwords do not match', '');
    } else {
      const name = firstName + ' ' + lastName

      this.userService.register({
        typeDocument,
        document,
        name,
        password,
        confPassword,
        phone,
        address,
        email
      }).subscribe((res) => {

          this.openSnackBar('usuario se registro correctamente', '');
          this.cargando();

      },
        (e) => {
          this.openSnackBar(e.error.detail, '');
        });

    }




  }

  cargando() {
    this.loading = true;
    setTimeout(() => {

      this.router.navigate(['/login']);
    }, 1500);
  }

  login() {
    this.router.navigate(['/login']);
    this.loading = true;
    setTimeout(() => {

      this.router.navigate(['/login']);
    }, 1500);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
