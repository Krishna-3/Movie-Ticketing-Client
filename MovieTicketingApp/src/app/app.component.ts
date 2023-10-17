import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieService } from './services/movie.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';

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
		private jwtService: JwtService) { }

	ngOnInit(): void {
		this.languageForm = this.fb.group({
			preferredLanguage: new FormControl('')
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
		const userId: string = this.jwtService.getId(this.localStorageService.get('accessToken') as string) as string;

		if (userId.length === 0)
			return

		this.subscription2 = this.userService.logout(userId).subscribe(data => this.router.navigate(['/login']));
		this.localStorageService.remove('accessToken');
		this.localStorageService.remove('refreshToken');
		this.localStorageService.remove('timeId');
		this.localStorageService.remove('date');
		this.localStorageService.remove('language');
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