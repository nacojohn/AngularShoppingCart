import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from '../auth/auth.service';

export class LoggingInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercepted!!", req);
    // const copiedReq = req.clone({params: req.params.set('auth', this.authService.getToken())})
    return next.handle(req).do(
      event => {
        console.log('Logging Interceptor', event)
      }
    )
  }
}
