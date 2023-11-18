import { Component, OnInit  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from 'src/app/services/service.service';
import { UsersService } from 'src/app/services/users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  loading = false;
  table = false;
  servicio_status:string='OK'
  idClient = this.userService.getidClient()
  data: any[] = [];
  dataTable: any[] = [];

  constructor(
    public serviceService: ServiceService,
    public userService: UsersService,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.loading = true;
    this.list()
    setTimeout(() => {
      this.loading = false;
    }, 1500);

  }

  list(){
    Promise.all([
      this.serviceService.getServicebyClient(this.idClient).toPromise(),
    ]).then((res:any) => {
      const data= res[0]['status'] === 200 ? res[0]['body']['data'] : [];
      this.dataTable= res[0]['status'] === 200 ? res[0]['body']['data'] : [];
      data.forEach((x:any) => {
        x.entryDate= this.datePipe.transform(x.entryDate, 'HH:mm / dd-MM-yyyy');
        x.departureDate= this.datePipe.transform(x.departureDate, 'HH:mm / dd-MM-yyyy');
        if (x.status=='ACTIVO') {
          this.data.push(x)
        }
      });
      //this.data=data;


      this.dataTable.sort((a:any, b:any) => {
        // Primero, ordena por estado (ACTIVO primero)
        const statusOrder = this.getStatusOrder(b.status) - this.getStatusOrder(a.status);

        // Si el estado es el mismo, ordena por fecha (de más reciente a más antigua)
        if (statusOrder === 0) {
          const dateOrder = this.compareDates(b.entryDate, a.entryDate);
          return dateOrder;
        }

        return statusOrder;
      });


    });

  }

  openTable(){
    if (this.table) {
      this.table=false
    }else{
      this.table=true
    }
  }

  getStatusOrder(status: string): number {
    return status === 'ACTIVO' ? 1 : 0;
  }

  // Función auxiliar para comparar fechas en formato "HH:mm / DD-MM-YYYY"
  compareDates(dateStrA: string, dateStrB: string): number {
    const dateA = new Date(this.getFormattedDate(dateStrA));
    const dateB = new Date(this.getFormattedDate(dateStrB));
    return dateB.getTime() - dateA.getTime();
  }

  // Función auxiliar para formatear las fechas en un formato aceptado por el constructor Date
  getFormattedDate(dateStr: string): string {
    // Extraer la parte de la fecha y la hora
    const [, time, date] = dateStr.split(' / ');

    // Obtener el formato "MM/DD/YYYY HH:mm" (puede variar según tus necesidades)
    return `${date.split('-').reverse().join('/')} ${time}`;
  }

}
