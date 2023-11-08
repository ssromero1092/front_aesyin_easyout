
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

const urlAPI = environment.apiURL;
const endpoint = 'vehicle';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private httpOptions: any;
  private token: any;

  constructor(
    private http: HttpClient,
    private usersService: UsersService
  ) {
    this.token = this.usersService.getToken();
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.token)

    this.httpOptions = {
      headers
    };


  }

  createVehicle(data: any): Observable<any> {
    const strEndPoint = urlAPI + endpoint;
    console.log(strEndPoint);

    console.log(this.httpOptions);

    return this.http.post<Response>(strEndPoint,data)
  }
}
