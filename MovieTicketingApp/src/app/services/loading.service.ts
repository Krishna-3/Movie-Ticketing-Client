import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LoadingService {

	private loading = new BehaviorSubject<boolean>(false);
	public loading$ = this.loading.asObservable();

	constructor() { }

	load() {
		this.loading.next(true);
	}

	finish() {
		this.loading.next(false);
	}
}
