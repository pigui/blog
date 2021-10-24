import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthFacade } from '@blog/auth';
import { concatMap, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements HttpInterceptor {
  constructor(private authFacade: AuthFacade) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authFacade.accessToken$.pipe(
      concatMap((token) => {
        const request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token || ''}`,
          },
        });

        return next.handle(request);
      })
    );
  }
}
