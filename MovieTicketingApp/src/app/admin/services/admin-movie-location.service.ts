import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieLocationId } from '../interfaces/adminInterfaces';

@Injectable({
	providedIn: 'root'
})
export class AdminMovieLocationService {

	constructor(private http: HttpClient) { }

	getMovieLocations() {
		return this.http.get(`https://localhost:7064/MovieLocation`);
	}

	createMovieLocation(movieLocation: MovieLocationId) {
		return this.http.post(`https://localhost:7064/MovieLocation`, movieLocation);
	}

	deleteMovieLocation(movieLocationId: number) {
		return this.http.delete(`https://localhost:7064/MovieLocation/${movieLocationId}`);
	}
}