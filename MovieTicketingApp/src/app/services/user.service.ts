import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Passwords, UserLoginRequest, UserSignup } from '../interfaces/user';

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

	changeUsername(userId: number, username: string) {
		return this.http.patch(`https://localhost:7064/User/username/${userId}?username=${username}`, null);
	}

	changePassword(userId: number, passwords: Passwords) {
		return this.http.patch(`https://localhost:7064/User/password/${userId}`, passwords);
	}

	deleteUser(userId: number) {
		return this.http.delete(`https://localhost:7064/User/${userId}`);
	}
}
