import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { City, TheatreModel, TheatreName } from '../interfaces/adminInterfaces';
import { AdminTheatreService } from '../services/admin-theatre.service';
import { Router } from '@angular/router';
import { AdminLocationService } from '../services/admin-location.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-theatre',
	templateUrl: './theatre.component.html',
	styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	subscription2!: Subscription;

	subscription3!: Subscription;

	subscription4!: Subscription;

	subscription5!: Subscription;

	theatreForm!: FormGroup;

	theatreNameForm!: FormGroup;

	theatreLocationForm!: FormGroup;

	theatres!: TheatreModel[];

	cities$!: Observable<City[]>

	constructor(private fb: FormBuilder,
		private adminTheatreService: AdminTheatreService,
		private adminLocationService: AdminLocationService,
		private router: Router,
		private snackbar: MatSnackBar) { }

	ngOnInit(): void {
		this.subscription5 = this.adminTheatreService.getTheatres().subscribe(
			{
				next: data => this.theatres = data as TheatreModel[],
				error: err => {
					if ('message' in err.error)
						return this.snackbar.open(err.error.message[0], 'ok')
					if ('title' in err.error)
						return this.snackbar.open(err.error.title, 'ok')
					return this.snackbar.open('error occured', 'ok')
				}
			});
		this.cities$ = this.adminLocationService.getLocations() as Observable<City[]>;

		this.theatreForm = this.fb.group({
			nameEn: new FormControl('', {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.maxLength(29),
					Validators.minLength(2),
					Validators.pattern(/^[a-zA-Z ]{2,29}$/m)
				]
			}),
			nameTe: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			nameHi: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			locationId: new FormControl('', { validators: [Validators.required] })
		});

		this.theatreNameForm = this.fb.group({
			nameEn: new FormControl('', {
				updateOn: 'blur',
				validators: [
					Validators.required,
					Validators.pattern(/^[a-zA-Z ]{2,29}$/m)
				]
			}),
			nameTe: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			nameHi: new FormControl('', { validators: [Validators.required] }),
			theatreId: new FormControl('', { validators: [Validators.required] })
		});

		this.theatreLocationForm = this.fb.group({
			locationId: new FormControl('', { validators: [Validators.required] }),
			theatreId: new FormControl('', { validators: [Validators.required] })
		});
	}

	createTheatre() {
		const theatreName: TheatreName = {
			nameEn: this.theatreForm.get('nameEn')?.value,
			nameHi: this.theatreForm.get('nameHi')?.value,
			nameTe: this.theatreForm.get('nameTe')?.value
		};
		const locationId = this.theatreForm.get('locationId')?.value;

		this.subscription1 = this.adminTheatreService.createTheatre(theatreName, locationId).subscribe({
			next: data => this.reload(),
			error: err => {
				if ('message' in err.error)
					return this.snackbar.open(err.error.message[0], 'ok')
				if ('title' in err.error)
					return this.snackbar.open(err.error.title, 'ok')
				return this.snackbar.open('error occured', 'ok')
			}
		});
	}

	updateTheatreName() {
		const theatreName: TheatreName = {
			nameHi: this.theatreNameForm.get('nameHi')?.value,
			nameEn: this.theatreNameForm.get('nameEn')?.value,
			nameTe: this.theatreNameForm.get('nameTe')?.value,
		};
		const theatreId = this.theatreNameForm.get('theatreId')?.value;

		this.subscription2 = this.adminTheatreService.updateTheatreName(theatreName, theatreId).subscribe({
			next: data => this.reload(),
			error: err => {
				if ('message' in err.error)
					return this.snackbar.open(err.error.message[0], 'ok')
				if ('title' in err.error)
					return this.snackbar.open(err.error.title, 'ok')
				return this.snackbar.open('error occured', 'ok')
			}
		})
	}

	updateTheatreLocation() {
		const locationId = this.theatreLocationForm.get('locationId')?.value;
		const theatreId = this.theatreLocationForm.get('theatreId')?.value;

		this.subscription3 = this.adminTheatreService.updateTheatreLocation(locationId, theatreId).subscribe({
			next: data => this.reload(),
			error: err => {
				if ('message' in err.error)
					return this.snackbar.open(err.error.message[0], 'ok')
				if ('title' in err.error)
					return this.snackbar.open(err.error.title, 'ok')
				return this.snackbar.open('error occured', 'ok')
			}
		})
	}

	deleteTheatre(theatreId: number) {
		this.subscription4 = this.adminTheatreService.deleteTheatre(theatreId).subscribe({
			next: data => this.reload(),
			error: err => {
				if ('message' in err.error)
					return this.snackbar.open(err.error.message[0], 'ok')
				if ('title' in err.error)
					return this.snackbar.open(err.error.title, 'ok')
				return this.snackbar.open('error occured', 'ok')
			}
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
		if (this.subscription4) {
			this.subscription4.unsubscribe();
		}
		if (this.subscription5) {
			this.subscription5.unsubscribe();
		}
	}
}