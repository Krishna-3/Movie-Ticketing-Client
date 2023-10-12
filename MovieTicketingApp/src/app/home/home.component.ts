import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { City, Movie, MovieEn, MovieHi, MovieTe } from '../interfaces/movie';
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

	movies: Movie[] = [];

	constructor(private movieService: MovieService,
		private fb: FormBuilder) { }

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
							const res = data;

							if (Array.isArray(res)) {
								const movieArray: Movie[] = res.map((movieData) => {

									if (movieData.type === "en") {
										return {
											id: movieData.id,
											title: movieData.titleEn,
											description: movieData.descriptionEn,
											language: movieData.languageEn,
											rating: movieData.rating,
										} as Movie
									}
									else if (movieData.type === "te") {
										return {
											id: movieData.id,
											title: movieData.titleTe,
											description: movieData.descriptionTe,
											language: movieData.languageTe,
											rating: movieData.rating,
										} as Movie
									}
									else {
										return {
											id: movieData.id,
											title: movieData.titleHi,
											description: movieData.descriptionHi,
											language: movieData.languageHi,
											rating: movieData.rating,
										} as Movie
									}
								});
								this.movies = movieArray;
							}
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