import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private httpclient: HttpClient
  ) { }

  adminData() {
    //setting http headers
    const httpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    });

    const options = {
      headers: httpHeaders
    }

    // return this.httpclient.get<any>("http://localhost:3000/api/user", options)
    return this.httpclient.get<any>('http://localhost:3000/api/user', options)
      .pipe(
        tap(
          {
            next: data => {
              console.log(data)
            }
          }
        ))
  }

}
