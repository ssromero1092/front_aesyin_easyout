import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {

  loading = false;
  registercardform: NgForm | null = null;
  displayedColumns: string[] = ['cardNumber', 'dueDate','cvv', 'autoDebit'];
  data: any[] = [];
  constructor(
    public userService: UsersService,
    public cardService: CardService,
    public snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { cardNumber, dueDate, cvv, autoDebit } = form.value;
      const idClient = this.userService.getidClient();
      this.cardService.createCard({
        number:cardNumber,
        expirationDate:dueDate,
        cvv,
        automaticDebit:autoDebit,
        fkIdClient:idClient,
      }).subscribe(
        (res) => {
          this.cargando();
          this.openSnackBar('The vehicle was registered successfully', '');
        },
        (e) => {
          this.openSnackBar(e.error.detail, '');
        }
      );
    };
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  cargando() {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(['dashboard']);
    }, 1500);
  }

}
