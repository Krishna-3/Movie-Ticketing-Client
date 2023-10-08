import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	signupForm!: FormGroup

	constructor(private fb: FormBuilder) { }

	ngOnInit(): void {
		this.signupForm = this.fb.group({

			username: new FormControl('', {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.pattern(/^[A-Za-z][A-Za-z_0-9]{7,30}$/g)
				]
			}),

			password: new FormControl('', {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.minLength(7)
				]
			}),

			email: new FormControl('', {
				validators: [Validators.required, Validators.email]
			})
		});
	}

	signup() {
		console.log(this.signupForm.getRawValue());
	}
}