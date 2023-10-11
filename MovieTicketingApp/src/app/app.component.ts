import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MovieService } from './services/movie.service';
import { Router } from '@angular/router';

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
		private router: Router) { }

	ngOnInit(): void {
		this.languageForm = this.fb.group({
			preferredLanguage: new FormControl('')
		});
	}

	setLanguage() {
		this.subscription = this.movieService.setLanguage(this.languageForm.get('preferredLanguage')?.value).subscribe(data => {
			const present = this.router.url;
			this.router.navigate(['/signup']).then(s => this.router.navigateByUrl(present));

		});
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}