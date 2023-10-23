import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Theatre, TheatreEn, TheatreHi, TheatreTe, } from '../interfaces/theatre';
import { ParseService } from '../services/parse.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { Movie, MovieEn, MovieHi, MovieTe } from '../interfaces/movie';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-theatres',
	templateUrl: './theatres.component.html',
	styleUrls: ['./theatres.component.css']
})
export class TheatresComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	subscription2!: Subscription;

	theatres$!: Observable<TheatreEn[] | TheatreTe[] | TheatreHi[]>;

	theatres!: Theatre[];

	theatreForm!: FormGroup;

	dates: string[] = [];

	movie$!: Observable<MovieEn | MovieHi | MovieTe>;

	movie!: Movie;

	readonly timings: string[] = ['09:00:00', '13:00:00', '17:00:00', '22:00:00'];

	todayTimings: string[] = ['09:00:00', '13:00:00', '17:00:00', '22:00:00'];

	constructor(private movieService: MovieService,
		private route: ActivatedRoute,
		private parseService: ParseService,
		private fb: FormBuilder,
		private localStorageService: LocalStorageService,
		private snackbar: MatSnackBar) { }

	ngOnInit(): void {
		this.getTodayTimings();
		this.getDates();

		this.theatreForm = this.fb.group({
			date: new FormControl(this.dates[0])
		})

		this.theatres$ = this.route.params.pipe(
			switchMap(params => {
				return this.movieService.getTheatres(params['movieId']) as Observable<TheatreEn[] | TheatreTe[] | TheatreHi[]>
			})
		);

		this.subscription1 = this.theatres$.subscribe({
			next: data => {
				this.theatres = this.parseService.parseTheatres(data);

				this.movie$ = this.route.params.pipe(
					switchMap(params => {
						return this.movieService.getMovie(params['movieId']) as Observable<MovieEn | MovieHi | MovieTe>
					})
				);

				this.subscription2 = this.movie$.subscribe({
					next: data => this.movie = this.parseService.parseMovies([data])[0],
					error: err => this.snackbar.open('error occured', 'ok')
				})
			},
			error: err => this.snackbar.open('error occured', 'ok')
		});
	}

	formatDate(date: Date) {
		const day = date.getDate().toString();
		const month = (date.getMonth() + 1).toString();
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	}

	getDates() {
		const currentDate = new Date();
		const nextDate = new Date(currentDate);

		for (let i = 0; i <= 6; i++) {
			nextDate.setDate(currentDate.getDate() + i);
			this.dates.push(this.formatDate(nextDate));
		}
	}

	getTodayTimings() {
		const time = new Date().toString().slice(16, 24);

		this.todayTimings = this.todayTimings.filter(t => t > time);
	}

	addTimeDate(t: string) {
		this.localStorageService.set('timeId', (this.timings.indexOf(t) + 1).toString());
		this.localStorageService.set('date', this.theatreForm.get('date')?.value);
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