
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

const urlAPI = environment.apiURL;
const endpoint = 'credit-card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }
  createCard(data: any): Observable<any> {
    const strEndPoint = urlAPI + endpoint;
    return this.http.post<Response>(strEndPoint,data)
  }
}
