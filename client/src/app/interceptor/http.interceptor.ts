import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authHeader;
        if(localStorage.getItem('token')) {
            authHeader = `Bearer ${localStorage.getItem('token')}`;
        } else {
            return next.handle(req);
        }

        const authReq = req.clone({
            headers: req.headers.set(
                'Authorization',
               authHeader
            )
        });

        return next.handle(authReq);
    }
}
