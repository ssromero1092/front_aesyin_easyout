import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { environment } from 'src/environments/environment';

const urlAPI = environment.apiURL;

const endpoint = 'client';

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }


  login(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/login", user);
  }

  register(user: any): Observable<any> {
    const strEndPoint = urlAPI + endpoint;
    console.log(user);
    return this.http.post<Response>(strEndPoint, { user }, {  observe: 'response' })
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

}
