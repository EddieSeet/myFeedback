//intersect http requests and put in bearer token

//to be implemented for services
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    // intercept(request: HttpRequest<any>,
    //      next: HttpHandler): Observable<HttpEvent<any>> {
    //     // Add authorization header with jwt token if available.
    //     // Having this JwtInterceptor will help you to have cleaner code when making HTTP request calls.
    //     // Developer note: 
    //     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //     console.dir('JwtInterceptor logic has executed. Inspecting the currentUser variable\'s token property');
    //     console.dir(currentUser);
    //     console.log('-----------------------------------------------------------------------------------------')
    //     if (currentUser && currentUser.token != '') {
    //         request = request.clone({
    //             setHeaders: { 
    //                 Authorization: `Bearer ${currentUser.token}`
    //             }
    //         });
    //     }

    //     return next.handle(request);
    // }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("id_token");

        console.log("the id token is" +idToken)

        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + idToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }


}