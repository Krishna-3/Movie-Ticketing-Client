import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AdminMovieLocationService } from '../services/admin-movie-location.service';
import { AdminLocationService } from '../services/admin-location.service';
import { Router } from '@angular/router';
import { AdminMovieService } from '../services/admin-movie.service';
import { City, MovieLocationId, MovieLocationModel, MovieModel } from '../interfaces/adminInterfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-movie-location',
	templateUrl: './movie-location.component.html',
	styleUrls: ['./movie-location.component.css']
})
export class MovieLocationComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	subscription2!: Subscription;

	movieLocationForm!: FormGroup;

	movies$!: Observable<MovieModel[]>;

	cities$!: Observable<City[]>;

	movieLocations$!: Observable<MovieLocationModel[]>

	constructor(private fb: FormBuilder,
		private adminMovieLocationService: AdminMovieLocationService,
		private adminLocationService: AdminLocationService,
		private adminMovieService: AdminMovieService,
		private router: Router,
		private snackbar: MatSnackBar) { }

	ngOnInit(): void {
		this.movies$ = this.adminMovieService.getMovies() as Observable<MovieModel[]>;
		this.cities$ = this.adminLocationService.getLocations() as Observable<City[]>;
		this.movieLocations$ = this.adminMovieLocationService.getMovieLocations() as Observable<MovieLocationModel[]>;

		this.movieLocationForm = this.fb.group({
			movieId: new FormControl('', { validators: [Validators.required] }),
			locationId: new FormControl('', { validators: [Validators.required] }),
		})
	}

	createMovieLocation() {
		const movieLocation: MovieLocationId = {
			locationId: this.movieLocationForm.get('locationId')?.value,
			movieId: this.movieLocationForm.get('movieId')?.value
		}

		this.subscription1 = this.adminMovieLocationService.createMovieLocation(movieLocation).subscribe({
			next: data => this.reload(),
			error: err => this.snackbar.open('error occured', 'ok')
		});
	}

	deleteMovieLocation(mlId: number) {
		this.subscription2 = this.adminMovieLocationService.deleteMovieLocation(mlId).subscribe({
			next: data => this.reload(),
			error: err => this.snackbar.open('error occured', 'ok')
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
	}
}