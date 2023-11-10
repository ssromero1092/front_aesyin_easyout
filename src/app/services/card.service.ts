
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersService } from './users.service';

const urlAPI = environment.apiURL;
const endpoint = 'credit-card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  protected ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    private http: HttpClient
    ) { }

  public createCard(data: any): Observable<any> {
    console.log(data);

    const strEndPoint = urlAPI + endpoint;
    console.log(strEndPoint);
    return this.http.post<Response>(strEndPoint,data)
  }

  public getCreditCardbyClient(idClient: string): Observable<{}> {
    const strEndPoint = urlAPI + endpoint + '?idClient='+idClient;
    return this.http.get<Response>(strEndPoint, { observe: 'response' }).pipe(takeUntil(this.ngUnsubscribe));
  }

  public delCreditCardbyId(idCreditCard: string) : Observable<{}> {
    const strEndPoint = urlAPI + endpoint +'?idCreditCard='+idCreditCard;
    console.log(strEndPoint);
    return this.http.delete<Response>(strEndPoint, { observe: 'response'});
  }
}
