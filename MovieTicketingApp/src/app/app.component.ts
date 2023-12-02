import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieService } from './services/movie.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { LoadingService } from './services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	subscription1!: Subscription;

	subscription2!: Subscription;

	languageForm!: FormGroup

	constructor(private fb: FormBuilder,
		private movieService: MovieService,
		private router: Router,
		private localStorageService: LocalStorageService,
		private userService: UserService,
		private jwtService: JwtService,
		public loader: LoadingService,
		public snackbar: MatSnackBar) { }

	loading$ = this.loader.loading$;

	ngOnInit(): void {
		this.languageForm = this.fb.group({
			preferredLanguage: new FormControl('')
		});

		if (navigator.language[0] === 'e' || navigator.language[0] === 't' || navigator.language[0] === 'h')
			this.movieService.setLanguage(navigator.language.slice(0, 2)).subscribe(data => {
				const present = this.router.url;
				this.router.navigate(['/signup']).then(s => this.router.navigateByUrl(present));
				this.localStorageService.set('language', this.languageForm.get('preferredLanguage')?.value)
			});
	}

	setLanguage() {
		this.subscription1 = this.movieService.setLanguage(this.languageForm.get('preferredLanguage')?.value).subscribe(data => {
			const present = this.router.url;
			this.router.navigate(['/signup']).then(s => this.router.navigateByUrl(present));
			this.localStorageService.set('language', this.languageForm.get('preferredLanguage')?.value)
		});
	}

	logout() {
		const refreshToken: string = this.localStorageService.get('refreshToken') as string

		this.subscription2 = this.userService.logout(refreshToken).subscribe(data => {
			this.localStorageService.remove('accessToken');
			this.localStorageService.remove('refreshToken');
			this.localStorageService.remove('timeId');
			this.localStorageService.remove('date');
			this.localStorageService.remove('language');
			this.router.navigate(['/login'])
			return this.snackbar.open('successfully logged out', 'ok')
		});

	}

	isLoggedin() {
		const token = this.localStorageService.get('refreshToken') as string;
		if (token === null)
			return false

		const isExpired = this.jwtService.isTokenExpired(token);

		return isExpired ? false : true;
	}

	isAdmin() {
		const token = this.localStorageService.get('accessToken') as string;
		if (token === null)
			return false

		const isAdmin = this.jwtService.getRole(token);
		return isAdmin === 'admin' ? true : false;
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