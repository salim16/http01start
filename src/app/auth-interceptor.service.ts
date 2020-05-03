import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptorService implements HttpInterceptor {

    // it runs right before our http requests leave our application
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Request is on its way');
        //req.url = "adad"; // not possible url is a immutable object
        const modifiedRequest = req.clone(
            {headers: req.headers.append('Auth', 'xyz')}
        );
        //return next.handle(req);
        return next.handle(modifiedRequest);
    }
    
}