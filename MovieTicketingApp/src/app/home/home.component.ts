import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { City, Movie } from '../interfaces/movie';
import { ParseService } from '../services/parse.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	subscription2!: Subscription;

	subscription3!: Subscription;

	locationForm!: FormGroup;

	cities!: City[]

	movies!: Movie[];

	constructor(private movieService: MovieService,
		private fb: FormBuilder,
		private parseService: ParseService) { }

	ngOnInit(): void {
		this.subscription2 = this.movieService.getLocations().subscribe(data => {
			this.cities = data as City[];
		});

		this.locationForm = this.fb.group({
			selectedLocation: new FormControl('')
		});
	}

	getMovies() {
		const selectedLocation = this.locationForm.get('selectedLocation')?.value;
		if (selectedLocation !== "") {

			this.subscription3 = this.movieService.setLocation(selectedLocation).subscribe({
				next: data => {
					this.subscription1 = this.movieService.getMovies().subscribe({
						next: data => {
							this.movies = this.parseService.parseMovies(data);
						},
						error: err => console.log(err)
					})
				}
			})
		}
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