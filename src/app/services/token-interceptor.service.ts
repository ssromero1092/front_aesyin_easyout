import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  private token: any;
  constructor(
    private usersService: UsersService,
    private router : Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    //const token: string = this.usersService.getToken();
    const token = sessionStorage.getItem('token');

    console.log(token);

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `${ token }`
        }
      });
    }
    return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {

      if (err.status === 401) {
        this.router.navigateByUrl('/login');
      }

      return throwError( err );

    }));
  }
}
