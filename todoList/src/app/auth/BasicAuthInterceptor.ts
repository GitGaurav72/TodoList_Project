import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the username and password from a service or environment
        const username = 'yourUsername';
        const password = 'yourPassword';
        const encodedCredentials = btoa(`${username}:${password}`);

        // Clone the request and set the Authorization header
        const authReq = request.clone({
            setHeaders: {
                Authorization: `Basic ${encodedCredentials}`
            }
        });

        return next.handle(authReq);
    }
}
