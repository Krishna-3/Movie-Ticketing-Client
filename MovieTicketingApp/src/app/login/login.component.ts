import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { UserLoginResponse } from '../interfaces/user';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

	loginForm!: FormGroup;

	subscription!: Subscription;

	constructor(private fb: FormBuilder,
		private userService: UserService,
		private router: Router,
		private localStorageService: LocalStorageService) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({

			username: new FormControl('', { updateOn: 'blur' }),

			password: new FormControl('')
		});
	}

	login() {
		this.subscription = this.userService.login(this.loginForm.getRawValue()).subscribe({
			next: data => {
				const res = data as UserLoginResponse;
				this.localStorageService.set("AccessToken", res.accessToken);
				this.localStorageService.set("refreshToken", res.refreshToken);
				this.router.navigate(['/home']);
				this.loginForm.reset();
			},
			error: err =>
				console.log(err)
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
