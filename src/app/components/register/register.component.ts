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
export class RegisterComponent implements OnInit{


  loading = false;

  user = {
    typeDocument:'',
    document:'',
    firstName:'',
    lastName:'',
    name :'',
    email:'',
    password:'',
    confPassword:'',
    phone:'',
    address:'',
  };

  constructor(
    private router: Router,
    public userService: UsersService,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
      this.user.typeDocument='CC';
      this.user.document='1088010149';
      this.user.firstName='Simon';
      this.user.lastName='Romero';
      this.user.name='Simon Romero';
      this.user.email='ssromero@utp.edu.co';
      this.user.password='123';
      this.user.confPassword='123';
      this.user.phone='3136452100';
      this.user.address='calle 123';
  }

  onSubmit(form: NgForm): void {
    console.log(form.value);

    const { typeDocument, document, firstname, lastname, password, confPassword, phone, address} = form.value;


    if (
      !typeDocument ||
      !document ||
      !password ||
      !confPassword
    ) {
      this.openSnackBar('Please complete all required fields', 'Continue');
    } else if (password !== confPassword) {
      this.openSnackBar('Passwords do not match', 'Continue');
    } else {
      const user = {
        typeDocument,
        document,
        name: firstname + ' ' + lastname,
        password,
        confPassword,
        phone,
        address,
      };



      console.log(user);


      this.userService.register(user).subscribe(
        data => {
          this.userService.setToken(data.token);
          //this.router.navigateByUrl("/");
          this.cargando();
        },
        error => {
          console.log(error);
        });

    }




  }

  cargando() {
    this.loading = true;
    setTimeout(() => {

      this.router.navigate(['dashboard']);
    }, 1500);
  }

  login() {
    this.router.navigate(['/login']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
