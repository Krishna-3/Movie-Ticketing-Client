import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpClient
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtService } from './jwt.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

	constructor(private localStorageService: LocalStorageService,
		private jwtService: JwtService,
		private http: HttpClient) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token = this.localStorageService.get("AccessToken");

		const req = request.clone({
			url: request.url,
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});

		return next.handle(req).pipe(
			catchError((error) => {
				if (token !== null) {
					if (error.status === 401 && this.jwtService.isTokenExpired(token as string)) {
						const refresh = this.localStorageService.get('refreshToken');

						if (refresh !== null) {
							return this.jwtService.getNewRefresh(refresh).pipe(
								switchMap(() => {

									const token = this.localStorageService.get("AccessToken");
									const newReq = request.clone({
										url: request.url,
										setHeaders: {
											Authorization: `Bearer ${token}`
										}
									});

									return next.handle(newReq)
								})
							)
						}
					}
				}
				return throwError(() => error);
			})
		)
	}
}