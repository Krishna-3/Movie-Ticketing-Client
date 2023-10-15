import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { City, TheatreModel, TheatreName } from '../interfaces/adminInterfaces';
import { AdminTheatreService } from '../services/admin-theatre.service';
import { Router } from '@angular/router';
import { AdminLocationService } from '../services/admin-location.service';

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

	theatreForm!: FormGroup;

	theatreNameForm!: FormGroup;

	theatreLocationForm!: FormGroup;

	theatres$!: Observable<TheatreModel[]>

	cities$!: Observable<City[]>

	constructor(private fb: FormBuilder,
		private adminTheatreService: AdminTheatreService,
		private adminLocationService: AdminLocationService,
		private router: Router) { }

	ngOnInit(): void {
		this.theatres$ = this.adminTheatreService.getTheatres() as Observable<TheatreModel[]>;
		this.cities$ = this.adminLocationService.getLocations() as Observable<City[]>;

		this.theatreForm = this.fb.group({
			nameEn: new FormControl('', {
				updateOn: 'blur',
				validators: [
					Validators.required,
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

		this.subscription1 = this.adminTheatreService.createTheatre(theatreName, locationId).subscribe(data => this.reload());
	}

	updateTheatreName() {
		const theatreName: TheatreName = {
			nameHi: this.theatreNameForm.get('nameHi')?.value,
			nameEn: this.theatreNameForm.get('nameEn')?.value,
			nameTe: this.theatreNameForm.get('nameTe')?.value,
		};
		const theatreId = this.theatreNameForm.get('theatreId')?.value;

		this.subscription2 = this.adminTheatreService.updateTheatreName(theatreName, theatreId).subscribe(data => this.reload())
	}

	updateTheatreLocation() {
		const locationId = this.theatreLocationForm.get('locationId')?.value;
		const theatreId = this.theatreLocationForm.get('theatreId')?.value;

		this.subscription3 = this.adminTheatreService.updateTheatreLocation(locationId, theatreId).subscribe(data => this.reload())
	}

	deleteTheatre(theatreId: number) {
		this.subscription4 = this.adminTheatreService.deleteTheatre(theatreId).subscribe(data => this.reload());
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