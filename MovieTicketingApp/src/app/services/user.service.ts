import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLoginRequest, UserSignup } from '../interfaces/user';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpClient) { }

	signup(user: UserSignup) {
		return this.http.post("https://localhost:7064/Authentication/register", user);
	}

	login(user: UserLoginRequest) {
		return this.http.post("https://localhost:7064/Authentication/login", user);
	}

	refresh(refreshToken: string) {
		return this.http.post("https://localhost:7064/Authentication/refresh ", { refreshToken: refreshToken });
	}

	logout(refreshToken: string) {
		return this.http.post("https://localhost:7064/Authentication/logout", { refreshToken: refreshToken });
	}
}
