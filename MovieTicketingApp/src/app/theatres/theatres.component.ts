import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Theatre, TheatreEn, TheatreHi, TheatreTe, } from '../interfaces/theatre';
import { ParseService } from '../services/parse.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
	selector: 'app-theatres',
	templateUrl: './theatres.component.html',
	styleUrls: ['./theatres.component.css']
})
export class TheatresComponent implements OnInit, OnDestroy {

	subscription!: Subscription;

	theatres$!: Observable<TheatreEn[] | TheatreTe[] | TheatreHi[]>;

	theatres!: Theatre[];

	theatreForm!: FormGroup;

	dates: string[] = [];

	readonly timings: string[] = ['09:00:00', '13:00:00', '17:00:00', '22:00:00'];

	todayTimings: string[] = ['09:00:00', '13:00:00', '17:00:00', '22:00:00'];

	constructor(private movieService: MovieService,
		private route: ActivatedRoute,
		private parseService: ParseService,
		private fb: FormBuilder,
		private localStorageService: LocalStorageService) { }

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

		this.subscription = this.theatres$.subscribe({
			next: data => this.theatres = this.parseService.parseTheatres(data),
			error: err => console.log(err)
		})
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
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}