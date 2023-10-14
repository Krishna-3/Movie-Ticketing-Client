import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieService } from './services/movie.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	subscription!: Subscription;

	languageForm!: FormGroup

	constructor(private fb: FormBuilder,
		private movieService: MovieService,
		private router: Router,
		private localStorageService: LocalStorageService) { }

	ngOnInit(): void {
		this.languageForm = this.fb.group({
			preferredLanguage: new FormControl('')
		});
	}

	setLanguage() {
		this.subscription = this.movieService.setLanguage(this.languageForm.get('preferredLanguage')?.value).subscribe(data => {
			const present = this.router.url;
			this.router.navigate(['/signup']).then(s => this.router.navigateByUrl(present));
			this.localStorageService.set('language', this.languageForm.get('preferredLanguage')?.value)
		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}