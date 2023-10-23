import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MovieDescription, MovieLanguage, MovieModel, MovieTitle } from '../interfaces/adminInterfaces';
import { AdminMovieService } from '../services/admin-movie.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	subscription2!: Subscription;

	subscription3!: Subscription;

	subscription4!: Subscription;

	subscription5!: Subscription;

	subscription6!: Subscription;

	subscription7!: Subscription;

	subscription8!: Subscription;

	subscription9!: Subscription;

	movieForm!: FormGroup;

	movieTitleForm!: FormGroup;

	movieDescriptionForm!: FormGroup;

	movieLanguageForm!: FormGroup;

	movieRatingForm!: FormGroup;

	moviePhotoForm!: FormGroup;

	movies!: MovieModel[]

	constructor(private fb: FormBuilder,
		private adminMovieService: AdminMovieService,
		private router: Router,
		private snackbar: MatSnackBar) { }

	ngOnInit(): void {
		this.subscription8 = this.adminMovieService.getMovies().subscribe(
			{
				next: data => this.movies = data as MovieModel[],
				error: err => {
					if ('message' in err.error)
						return this.snackbar.open(err.error.message[0], 'ok')
					if ('title' in err.error)
						return this.snackbar.open(err.error.title, 'ok')
					return this.snackbar.open('error occured', 'ok')
				}
			});

		this.movieForm = this.fb.group({
			titleEn: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			titleTe: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			titleHi: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			descriptionEn: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			descriptionTe: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			descriptionHi: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			languageEn: new FormControl('', {
				updateOn: 'blur', validators: [
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(20),
					Validators.pattern(/^[a-zA-Z]{2,20}$/m)
				]
			}),
			languageTe: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			languageHi: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			rating: new FormControl('', { validators: [Validators.required, Validators.max(5), Validators.min(1)] })
		});

		this.movieTitleForm = this.fb.group({
			titleEn: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			titleTe: new FormControl('', { validators: [Validators.required] }),
			titleHi: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			movieId: new FormControl('', { validators: [Validators.required] })
		});

		this.movieDescriptionForm = this.fb.group({
			descriptionEn: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			descriptionTe: new FormControl('', { validators: [Validators.required] }),
			descriptionHi: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			movieId: new FormControl('', { validators: [Validators.required] })
		});

		this.movieLanguageForm = this.fb.group({
			languageEn: new FormControl('', {
				updateOn: 'blur', validators: [
					Validators.required,
					Validators.pattern(/^[a-zA-Z]{2,20}$/m),
					Validators.minLength(2),
					Validators.maxLength(20)
				]
			}),
			languageTe: new FormControl('', { validators: [Validators.required] }),
			languageHi: new FormControl('', { updateOn: 'blur', validators: [Validators.required] }),
			movieId: new FormControl('', { validators: [Validators.required] })
		});

		this.movieRatingForm = this.fb.group({
			rating: new FormControl('', { validators: [Validators.required, Validators.max(5), Validators.min(1)] }),
			movieId: new FormControl('', { validators: [Validators.required] })
		});

		this.moviePhotoForm = this.fb.group({
			photo: new FormControl('', { validators: [Validators.required] }),
			movieId: new FormControl('', { validators: [Validators.required] })
		});
	}

	createMovie() {
		const movie: MovieModel = {
			titleEn: this.movieForm.get('titleEn')?.value,
			titleHi: this.movieForm.get('titleHi')?.value,
			titleTe: this.movieForm.get('titleTe')?.value,
			descriptionEn: this.movieForm.get('descriptionEn')?.value,
			descriptionHi: this.movieForm.get('descriptionHi')?.value,
			descriptionTe: this.movieForm.get('descriptionTe')?.value,
			languageEn: this.movieForm.get('languageEn')?.value,
			languageHi: this.movieForm.get('languageHi')?.value,
			languageTe: this.movieForm.get('languageTe')?.value,
			rating: this.movieForm.get('rating')?.value,
			photo: '',
			id: 0
		};

		this.subscription1 = this.adminMovieService.createMovie(movie).subscribe({
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

	updateMovieTitle() {
		const movie: MovieTitle = {
			titleEn: this.movieTitleForm.get('titleEn')?.value,
			titleHi: this.movieTitleForm.get('titleHi')?.value,
			titleTe: this.movieTitleForm.get('titleTe')?.value
		};
		const movieId = this.movieTitleForm.get('movieId')?.value;

		if (movieId === 0)
			return

		this.subscription2 = this.adminMovieService.updateMovieTitle(movie, movieId).subscribe({
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

	updateMovieDescription() {
		const movie: MovieDescription = {
			descriptionEn: this.movieDescriptionForm.get('descriptionEn')?.value,
			descriptionHi: this.movieDescriptionForm.get('descriptionHi')?.value,
			descriptionTe: this.movieDescriptionForm.get('descriptionTe')?.value
		};
		const movieId = this.movieDescriptionForm.get('movieId')?.value;

		this.subscription3 = this.adminMovieService.updateMovieDescription(movie, movieId).subscribe({
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

	updateMovieLanguage() {
		const movie: MovieLanguage = {
			languageEn: this.movieLanguageForm.get('languageEn')?.value,
			languageHi: this.movieLanguageForm.get('languageHi')?.value,
			languageTe: this.movieLanguageForm.get('languageTe')?.value
		};
		const movieId = this.movieLanguageForm.get('movieId')?.value;

		this.subscription4 = this.adminMovieService.updateMovieLanguage(movie, movieId).subscribe({
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

	updateMovieRating() {
		const rating = this.movieRatingForm.get('rating')?.value;
		const movieId = this.movieRatingForm.get('movieId')?.value;

		this.subscription5 = this.adminMovieService.updateMovieRating(rating, movieId).subscribe({
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

	uploadMoviePhoto() {
		const photo = new FormData();
		photo.append('photo', this.moviePhotoForm.get('photo')?.value);
		const movieId = this.moviePhotoForm.get('movieId')?.value;

		this.subscription6 = this.adminMovieService.uploadPhoto(photo, movieId).subscribe({
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

	deleteMovie(movieId: number) {
		this.subscription7 = this.adminMovieService.deleteMovie(movieId).subscribe({
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

	deletePhoto(movieId: number) {
		this.subscription9 = this.adminMovieService.deletePhoto(movieId).subscribe({
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

	onFileChange(event: any) {

		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.moviePhotoForm.patchValue({
				photo: file
			});
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
		if (this.subscription4) {
			this.subscription4.unsubscribe();
		}
		if (this.subscription5) {
			this.subscription5.unsubscribe();
		}
		if (this.subscription6) {
			this.subscription6.unsubscribe();
		}
		if (this.subscription7) {
			this.subscription7.unsubscribe();
		}
		if (this.subscription8) {
			this.subscription8.unsubscribe();
		}
		if (this.subscription9) {
			this.subscription9.unsubscribe();
		}
	}
}