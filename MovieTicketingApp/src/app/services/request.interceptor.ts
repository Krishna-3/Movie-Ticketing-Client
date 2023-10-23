import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

	constructor(private localStorageService: LocalStorageService,
		private jwtService: JwtService,
		private router: Router) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token = this.localStorageService.get("accessToken");

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
								switchMap((data) => {

									const newReq = request.clone({
										url: request.url,
										setHeaders: {
											Authorization: `Bearer ${data.accessToken}`
										}
									});

									return next.handle(newReq)
								})
							)
						}
					}
				}
				return throwError(() => {
					this.localStorageService.remove('accessToken');
					this.localStorageService.remove('refreshToken');
					this.router.navigate(['/login']);
					error;
				});
			})
		)
	}
}