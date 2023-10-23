import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AdminLocationService } from '../services/admin-location.service';
import { Router } from '@angular/router';
import { City } from '../interfaces/adminInterfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	subscription2!: Subscription;

	subscription3!: Subscription;

	locationForm!: FormGroup;

	locationUpdateForm!: FormGroup;

	cities$!: Observable<City[]>

	constructor(private fb: FormBuilder,
		private adminLocationService: AdminLocationService,
		private router: Router,
		private snackbar: MatSnackBar) { }

	ngOnInit(): void {
		this.cities$ = this.adminLocationService.getLocations() as Observable<City[]>;

		this.locationForm = this.fb.group({
			city: new FormControl('', {
				validators: [
					Validators.required,
					Validators.pattern(/^[a-zA-Z]{2,29}$/m),
					Validators.maxLength(29),
					Validators.minLength(2)
				]
			})
		});

		this.locationUpdateForm = this.fb.group({
			city: new FormControl('', {
				validators: [
					Validators.required,
					Validators.pattern(/^[a-zA-Z]{2,29}$/m),
					Validators.maxLength(29),
					Validators.minLength(2)
				]
			}),
			cityId: new FormControl('', { validators: [Validators.required] })
		});
	}

	createLocation() {
		if (this.locationForm.get('city')?.value.length === 0)
			return

		const location: City = {
			city: this.locationForm.get('city')?.value,
			id: 0
		}

		this.subscription1 = this.adminLocationService.createLocation(location).subscribe({
			next: data => this.reload(),
			error: err => this.snackbar.open(err.error.message[0], 'ok')
		});
	}

	updateLocation() {
		if (this.locationUpdateForm.get('cityId')?.value.length === 0)
			return

		const location: City = {
			city: this.locationUpdateForm.get('city')?.value,
			id: this.locationUpdateForm.get('cityId')?.value
		}

		this.subscription2 = this.adminLocationService.updateLocation(location).subscribe({
			next: data => this.reload(),
			error: err => this.snackbar.open(err.error.message[0], 'ok')
		});
	}

	deleteLocation(cityId: number) {
		this.subscription3 = this.adminLocationService.deleteLocation(cityId).subscribe({
			next: data => this.reload(),
			error: err => this.snackbar.open(err.error.message[0], 'ok')
		});
	}

	reload() {
		const present = this.router.url;
		this.router.navigate(['/admin']).then(s => this.router.navigateByUrl(present))
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