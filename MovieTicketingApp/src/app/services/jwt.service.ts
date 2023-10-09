import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { User } from '../interfaces/user';

@Injectable({
	providedIn: 'root'
})
export class JwtService {

	constructor() { }

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
}
