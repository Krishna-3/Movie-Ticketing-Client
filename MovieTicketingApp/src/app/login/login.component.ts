import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { UserLoginResponse } from '../interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';

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
		private localStorageService: LocalStorageService,
		private snackbar: MatSnackBar) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({

			username: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),

			password: new FormControl('', { validators: [Validators.required] })
		});
	}

	login() {
		this.subscription = this.userService.login(this.loginForm.getRawValue()).subscribe({
			next: data => {
				const res = data as UserLoginResponse;
				this.localStorageService.set("accessToken", res.accessToken);
				this.localStorageService.set("refreshToken", res.refreshToken);
				this.router.navigate(['/home']);
				this.loginForm.reset();
			},
			error: err => {
				if ('message' in err.error)
					return this.snackbar.open(err.error.message[0], 'ok')
				if ('title' in err.error)
					return this.snackbar.open(err.error.title, 'ok')
				return this.snackbar.open('error occured', 'ok')
			}
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
