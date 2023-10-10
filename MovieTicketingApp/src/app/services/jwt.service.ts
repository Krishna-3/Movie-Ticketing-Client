import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { User, UserLoginResponse } from '../interfaces/user';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class JwtService {

	constructor(private localStorageService: LocalStorageService,
		private userService: UserService,
		private router: Router) { }

	getDecodeToken(token: string) {
		return jwt_decode(token);
	}

	getUser(token: string) {
		const decodedToken = jwt_decode(token) as User;
		return decodedToken ? decodedToken?.Name : null;
	}

	getEmailId(token: string) {
		const decodedToken = jwt_decode(token) as User;
		return decodedToken ? decodedToken.Email : null;
	}

	getId(token: string) {
		const decodedToken = jwt_decode(token) as User;
		return decodedToken ? decodedToken.Id : null;
	}

	getRole(token: string) {
		const decodedToken = jwt_decode(token) as User;
		return decodedToken ? decodedToken.Role : null;
	}

	isTokenExpired(token: string): boolean {
		const decodedToken = jwt_decode(token) as User;
		const expiryTime = parseInt(decodedToken.exp);
		if (expiryTime) {
			return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
		} else {
			return false;
		}
	}

	getNewRefresh(refresh: string) {
		this.userService.refresh(refresh).pipe(
			tap(data => {
				const res = data as UserLoginResponse;
				this.localStorageService.set('accessToken', res.accessToken)
				this.localStorageService.set('refreshToken', res.refreshToken)
			}),
			catchError(err => this.router.navigate(['/login']))
		)
	}
}
