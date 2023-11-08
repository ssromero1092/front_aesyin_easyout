import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  //form!: FormGroup;
  loading = false;
  constructor(
    private router: Router,
    public userService: UsersService,
    public snackBar: MatSnackBar
  ) {
  }
  ngOnInit(){
    this.userService.removeToken();
  }
  onSubmit(form: NgForm): void {
    const email = form.value.email;
    const password = form.value.password;
    const password_valid = form.value.email + '+' + form.value.password;
    const user = { email: email, password: password };
    this.userService.login(
      btoa(password_valid)
    ).subscribe((data) => {
      console.log(data.data.token);
      this.userService.setToken(data.data.token,data.data.idClient);
      this.cargando();
    },
      (e) => {
        this.openSnackBar(e.error.detail, '');
      });
  }
  cargando() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }
  createAcocount() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/register']);
    }, 1500)
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
