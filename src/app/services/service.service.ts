import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from './users.service';

const urlAPI = environment.apiURL;
const endpoint = 'services';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private http: HttpClient,
  ) { }

  public getServicebyClient(idClient: string): Observable<{}> {
    const strEndPoint = urlAPI + endpoint + '?idClient='+idClient;
    console.log(strEndPoint);
    return this.http.get<Response>(strEndPoint, { observe: 'response' }).pipe(takeUntil(this.ngUnsubscribe));
  }
}
