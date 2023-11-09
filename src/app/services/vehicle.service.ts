
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsersService } from './users.service';

const urlAPI = environment.apiURL;
const endpoint = 'vehicle';
@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private http: HttpClient,
  ) {
  }

  public createVehicle(data: any): Observable<any> {
    const strEndPoint = urlAPI + endpoint;
    return this.http.post<Response>(strEndPoint,data)
  }

  public getVehiclebyClient(idClient: string): Observable<{}> {
    const strEndPoint = urlAPI + endpoint + '?idClient='+idClient;
    return this.http.get<Response>(strEndPoint, { observe: 'response' }).pipe(takeUntil(this.ngUnsubscribe));
  }

  public delVehiclebyId(idVehicle: number) : Observable<{}> {
    const strEndPoint = urlAPI + endpoint +'?idVehicle='+idVehicle;
    return this.http.delete<Response>(strEndPoint, { observe: 'response'});
  }
}
