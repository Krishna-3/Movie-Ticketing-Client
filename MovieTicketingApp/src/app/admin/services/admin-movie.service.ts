import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieDescription, MovieLanguage, MovieModel, MovieTitle } from '../interfaces/adminInterfaces';

@Injectable({
	providedIn: 'root'
})
export class AdminMovieService {

	constructor(private http: HttpClient) { }

	getMovies() {
		return this.http.get(`https://localhost:7064/Movie/all`);
	}

	createMovie(movie: MovieModel) {
		return this.http.post(`https://localhost:7064/Movie`, movie);
	}

	updateMovieTitle(movieTitle: MovieTitle, movieId: number) {
		return this.http.patch(`https://localhost:7064/Movie/title/${movieId}`, movieTitle);
	}

	updateMovieDescription(movieDescription: MovieDescription, movieId: number) {
		return this.http.patch(`https://localhost:7064/Movie/description/${movieId}`, movieDescription);
	}

	updateMovieLanguage(movieLanguage: MovieLanguage, movieId: number) {
		return this.http.patch(`https://localhost:7064/Movie/language/${movieId}`, movieLanguage);
	}

	updateMovieRating(rating: number, movieId: number) {
		return this.http.patch(`https://localhost:7064/Movie/rating/${movieId}?rating=${rating}`, null);
	}

	deleteMovie(movieId: number) {
		return this.http.delete(`https://localhost:7064/Movie/${movieId}`);
	}

	uploadPhoto(photo: FormData, movieId: number) {
		return this.http.post(`https://localhost:7064/Movie/photo/${movieId}`, photo);
	}

	deletePhoto(movieId: number) {
		return this.http.delete(`https://localhost:7064/Movie/photo/${movieId}`);
	}
}