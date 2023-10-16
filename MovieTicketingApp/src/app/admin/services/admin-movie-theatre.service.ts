import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieTheatreId } from '../interfaces/adminInterfaces';

@Injectable({
	providedIn: 'root'
})
export class AdminMovieTheatreService {

	constructor(private http: HttpClient) { }

	getMovieTheatres() {
		return this.http.get(`https://localhost:7064/MovieTheatre`);
	}

	createMovieTheatre(movieTheatre: MovieTheatreId) {
		return this.http.post(`https://localhost:7064/MovieTheatre`, movieTheatre);
	}

	deleteMovieTheatre(movieTheatreId: number) {
		return this.http.delete(`https://localhost:7064/MovieTheatre/${movieTheatreId}`);
	}
}