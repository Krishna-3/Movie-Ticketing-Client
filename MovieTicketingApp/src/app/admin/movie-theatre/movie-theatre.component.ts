import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { City, MovieLocationModel, MovieModel, MovieTheatreId, MovieTheatreModel, TheatreModel } from '../interfaces/adminInterfaces';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminTheatreService } from '../services/admin-theatre.service';
import { Router } from '@angular/router';
import { AdminLocationService } from '../services/admin-location.service';
import { AdminMovieTheatreService } from '../services/admin-movie-theatre.service';
import { AdminMovieService } from '../services/admin-movie.service';
import { AdminMovieLocationService } from '../services/admin-movie-location.service';

@Component({
	selector: 'app-movie-theatre',
	templateUrl: './movie-theatre.component.html',
	styleUrls: ['./movie-theatre.component.css']
})
export class MovieTheatreComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	subscription2!: Subscription;

	subscription3!: Subscription;

	subscription4!: Subscription;

	subscription5!: Subscription;

	subscription6!: Subscription;

	movieTheatreForm!: FormGroup;

	movies!: MovieModel[];

	cities!: City[];

	theatres!: TheatreModel[];

	theatresForCity!: TheatreModel[];

	movieLocationsForCity!: MovieLocationModel[];

	movieLocations!: MovieLocationModel[];

	movieTheatres$!: Observable<MovieTheatreModel[]>

	constructor(private fb: FormBuilder,
		private adminMovieTheatreService: AdminMovieTheatreService,
		private adminLocationService: AdminLocationService,
		private adminMovieService: AdminMovieService,
		private adminMovieLocationServie: AdminMovieLocationService,
		private adminTheatreService: AdminTheatreService,
		private router: Router) { }

	ngOnInit(): void {
		this.subscription1 = this.adminMovieService.getMovies().subscribe(data => this.movies = data as MovieModel[]);
		this.subscription2 = this.adminTheatreService.getTheatres().subscribe(data => this.theatres = data as TheatreModel[]);
		this.subscription3 = this.adminLocationService.getLocations().subscribe(data => this.cities = data as City[]);
		this.subscription4 = this.adminMovieLocationServie.getMovieLocations().subscribe(data => this.movieLocations = data as MovieLocationModel[]);
		this.movieTheatres$ = this.adminMovieTheatreService.getMovieTheatres() as Observable<MovieTheatreModel[]>;

		this.movieTheatreForm = this.fb.group({
			movieId: new FormControl('', { validators: [Validators.required] }),
			theatreId: new FormControl('', { validators: [Validators.required] }),
		})
	}

	onLocationChange(e: any) {
		this.theatresForCity = this.theatres.filter(t => t.locationId === parseInt(e.target.value));
		this.movieLocationsForCity = this.movieLocations.filter(ml => ml.locationId === parseInt(e.target.value));
	}

	createMovieTheatre() {
		const movieTheatreId: MovieTheatreId = {
			movieId: this.movieTheatreForm.get('movieId')?.value,
			theatreId: this.movieTheatreForm.get('theatreId')?.value
		};

		this.subscription5 = this.adminMovieTheatreService.createMovieTheatre(movieTheatreId).subscribe();
	}

	deleteMovieTheatre(mtId: number) {
		this.subscription6 = this.adminMovieTheatreService.deleteMovieTheatre(mtId).subscribe();
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
		if (this.subscription6) {
			this.subscription6.unsubscribe();
		}
	}
}