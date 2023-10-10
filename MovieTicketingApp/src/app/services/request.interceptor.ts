import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpClient
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

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
			catchError((err: HttpErrorResponse, caught$) => {

				if (err.status === 401) {
					const refresh = this.localStorageService.get('refreshToken');

					if (refresh !== null) {
						this.jwtService.getNewRefresh(refresh);
						const token = this.localStorageService.get("AccessToken");
						const newReq = request.clone({
							url: request.url,
							setHeaders: {
								Authorization: `Bearer ${token}`
							}
						});
						return this.http.request(newReq)
					}
				}
				return caught$;
			})
		);
	}
}
