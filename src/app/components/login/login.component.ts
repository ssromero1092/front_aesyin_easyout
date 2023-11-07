import { Component } from '@angular/core';
import { FormGroup, NgForm, } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //form!: FormGroup;
  loading = false;
  constructor(
    private router: Router,
    public userService: UsersService
  ) {
  }


  onSubmit(form: NgForm): void {
    // Método llamado para ir al formulario chat
    //localStorage.setItem(this.storageLoginKey, this.usuario.nombre_usuario);  // Almacenar el nombre de usuario en el almacenamiento local
    //this.router.navigate(['/chat']);                                          // Redirigir al componente 'chat'
    console.log(form);

    const email = form.value.email
    const password = form.value.password

    console.log({email});
    console.log({password});
    const user = { email: email, password: password };
    //this.router.navigateByUrl("/dashboard");
    this.cargando();
    this.userService.login(user).subscribe(
      data => {
      //console.log(data);
      this.userService.setToken(data.token);
      //this.router.navigateByUrl("/");
      this.cargando();
      //this.router.navigate(['dashboard']);
    },
    error => {
      console.log(error);
    });



  }

  cargando(){
    this.loading = true;
    setTimeout(() => {

      this.router.navigate(['dashboard']);
    },1500);
  }

  createAcocount(){
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['/register']);

    },1500)

  }
}
