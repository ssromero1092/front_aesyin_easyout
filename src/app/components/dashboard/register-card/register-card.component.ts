import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators  } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { UsersService } from 'src/app/services/users.service';
interface CreditCardData {
  idCreditCard: number;
  fkIdClient: number;
  number: string;
  cvv: number;
  expirationDate: string;
  automaticDebit: boolean | null;
}

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent {

  loading = false;
  registercardform: NgForm | null = null;
  displayedColumns: string[] = ['number', 'expirationDate','cvv', 'automaticDebit'];
  openregister = false;
  data = {
    idCreditCard: '',
    fkIdClient: '',
    number: '',
    cvv: '',
    expirationDate: '',
    automaticDebit: '',
  };
  idClient = this.userService.getidClient()
  constructor(
    public userService: UsersService,
    public cardService: CardService,
    public snackBar: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.list();
    setTimeout(() => {
      this.loading = false;
    }, 1500);



  }

  list(){
    Promise.all([
      this.cardService.getCreditCardbyClient(this.idClient).toPromise(),
    ]).then((res:any) => {
      this.data = res[0]['status'] === 200 ? res[0]['body']['data'] : [];
      console.log(this.data);

      if (!this.data.number) {
        this.openregister = true;
      }



    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const { number, expirationDate, cvv, automaticDebit} = form.value;
      const idClient = this.userService.getidClient();
      this.cardService.createCard({
        number,
        expirationDate,
        cvv,
        automaticDebit,
        fkIdClient:idClient,
      }).subscribe(
        (res) => {
          this.cancelRegister();
          this.openSnackBar('The card was registered successfully', '');
          this.list();
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


  changeRegister(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.openregister=true
    }, 1500);
  }

  cancelRegister(){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.openregister=false
    }, 1500);

  }

}
