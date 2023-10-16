import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CustomValidator } from '../validators/customValidator';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

	signupForm!: FormGroup;

	subscription!: Subscription;

	constructor(private fb: FormBuilder,
		private userService: UserService,
		private router: Router) { }

	ngOnInit(): void {
		this.signupForm = this.fb.group({

			username: new FormControl('', {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.pattern(/^[A-Za-z][A-Za-z_0-9]{7,30}$/m),
					Validators.maxLength(30),
					Validators.minLength(7)
				]
			}),

			password: new FormControl('', {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/m),
					Validators.minLength(6)
				]
			}),

			confirmPassword: new FormControl('', {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/m),
					Validators.minLength(6)
				]
			}),

			email: new FormControl('', {
				validators: [Validators.required, Validators.email]
			})
		}, { validators: [CustomValidator.validatePasswords] } as AbstractControlOptions);
	}

	signup() {
		this.subscription = this.userService.signup(this.signupForm.getRawValue()).subscribe({
			next: data => {
				console.log(data);
				this.router.navigate(['/login']);
				this.signupForm.reset();
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