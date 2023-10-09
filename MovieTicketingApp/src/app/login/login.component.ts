import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
		private router: Router) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({

			username: new FormControl('', {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.pattern(/^[A-Za-z][A-Za-z_0-9]{7,30}$/g)
				]
			}),

			password: new FormControl('', {
				validators: [
					Validators.required,
					Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/g)
				]
			})
		});
	}

	login() {
		this.subscription = this.userService.login(this.loginForm.getRawValue()).subscribe({
			next: data => {
				console.log(data);
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
