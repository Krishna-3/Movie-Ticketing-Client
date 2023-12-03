import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, finalize, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

	totalRequests = 0;
	completedRequests = 0;

	constructor(private localStorageService: LocalStorageService,
		private jwtService: JwtService,
		private router: Router,
		private loader: LoadingService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const token = this.localStorageService.get("accessToken");

		const req = request.clone({
			url: request.url,
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});

		this.loader.load();
		this.totalRequests++;

		return next.handle(req).pipe(

			finalize(() => {
				this.completedRequests++;

				if (this.completedRequests === this.totalRequests) {
					this.loader.finish();
					this.completedRequests = 0;
					this.totalRequests = 0;
				}
			}),

			catchError((error) => {
				if (token !== null) {
					if (error.status === 401 && this.jwtService.isTokenExpired(token as string)) {
						const refresh = this.localStorageService.get('refreshToken');

						if (refresh !== null) {
							return this.jwtService.getNewRefresh(refresh);
						}
					}
				}
				return throwError(() => {
					if (error.status === 401) {
						this.localStorageService.remove('accessToken');
						this.localStorageService.remove('refreshToken');
						this.router.navigate(['/login']);
					}
					return error;
				});
			})
		)
	}
}