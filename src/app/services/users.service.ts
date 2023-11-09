import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders  } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";

const urlAPI = environment.apiURL;

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private httpOptions: any;

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router,
  ) {

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')

    this.httpOptions = {
      headers
    };
  }

  login(customHeaderValue: string): Observable<any> {
    const endpoint = 'session';
    const strEndPoint = urlAPI + endpoint;
    const headers = this.httpOptions.headers.append('key', customHeaderValue);
    const customHttpOptions = { headers };
    return this.http.get(strEndPoint, customHttpOptions);
  }

  register(user: any): Observable<any> {
    const endpoint = 'client';
    const strEndPoint = urlAPI + endpoint;
    return this.http.post<Response>(strEndPoint, user, {  observe: 'response' })
  }

  setToken(token: string, idClient: string) {
    sessionStorage.setItem("token", token);
    this.cookies.set("token", token);
    this.cookies.set("idClient", idClient);
  }
  getToken() {
    return this.cookies.get("token");
  }

  removeToken(): void {
    this.cookies.deleteAll("token");
  }

  getidClient() {
    return this.cookies.get("idClient");
  }

}
