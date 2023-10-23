import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { JwtService } from '../services/jwt.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Passwords } from '../interfaces/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	subscription2!: Subscription;

	subscription3!: Subscription;

	usernameForm!: FormGroup;

	passwordForm!: FormGroup;

	constructor(private userService: UserService,
		private jwtService: JwtService,
		private localStorageService: LocalStorageService,
		private fb: FormBuilder,
		private router: Router,
		private snackbar: MatSnackBar) { }

	ngOnInit(): void {
		this.usernameForm = this.fb.group({
			username: new FormControl('', {
				validators: [
					Validators.required,
					Validators.pattern(/^[A-Za-z][A-Za-z_0-9]{7,30}$/m),
					Validators.maxLength(30),
					Validators.minLength(8)
				]
			})
		});

		this.passwordForm = this.fb.group({
			password: new FormControl('', {
				updateOn: 'blur',
				validators: [
					Validators.required
				]
			}),

			newPassword: new FormControl('', {
				validators: [
					Validators.required,
					Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/m),
					Validators.minLength(7)
				]
			}),
		})
	}

	changeUsername() {
		const userId = parseInt(this.jwtService.getId(this.localStorageService.get('accessToken') as string) as string);
		const username = this.usernameForm.get('username')?.value;

		this.subscription1 = this.userService.changeUsername(userId, username).subscribe({
			error: err => {
				if ('message' in err.error)
					return this.snackbar.open(err.error.message[0], 'ok')
				if ('title' in err.error)
					return this.snackbar.open(err.error.title, 'ok')
				return this.snackbar.open('error occured', 'ok')
			}
		});
	}

	changePassword() {
		const userId = parseInt(this.jwtService.getId(this.localStorageService.get('accessToken') as string) as string);
		const password = this.passwordForm.get('password')?.value;
		const newPassword = this.passwordForm.get('newPassword')?.value;
		const passwords: Passwords = {
			prevPassword: password,
			newPassword: newPassword
		}

		this.subscription2 = this.userService.changePassword(userId, passwords).subscribe({
			error: err => {
				if ('message' in err.error)
					return this.snackbar.open(err.error.message[0], 'ok')
				if ('title' in err.error)
					return this.snackbar.open(err.error.title, 'ok')
				return this.snackbar.open('error occured', 'ok')
			}
		});
	}

	deleteUser() {
		const userId = parseInt(this.jwtService.getId(this.localStorageService.get('accessToken') as string) as string);

		this.subscription3 = this.userService.deleteUser(userId).subscribe({
			next: data => {
				this.localStorageService.remove('accessToken');
				this.localStorageService.remove('refreshToken');
				this.router.navigate(['/signup']);
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
		if (this.subscription1) {
			this.subscription1.unsubscribe();
		}
		if (this.subscription2) {
			this.subscription2.unsubscribe();
		}
		if (this.subscription3) {
			this.subscription3.unsubscribe();
		}
	}
}