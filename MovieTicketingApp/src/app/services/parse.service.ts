import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { MovieService } from './movie.service';

@Injectable({
	providedIn: 'root'
})
export class ParseService {

	constructor() { }

	parseMovies(res: Object) {
		let movieArray: Movie[] = [];

		if (Array.isArray(res)) {
			movieArray = res.map((movieData) => {

				if (movieData.type === "en") {
					return {
						id: movieData.id,
						title: movieData.titleEn,
						description: movieData.descriptionEn,
						language: movieData.languageEn,
						rating: movieData.rating,
						photo: movieData.photo
					} as Movie
				}
				else if (movieData.type === "te") {
					return {
						id: movieData.id,
						title: movieData.titleTe,
						description: movieData.descriptionTe,
						language: movieData.languageTe,
						rating: movieData.rating,
						photo: movieData.photo
					} as Movie
				}
				else {
					return {
						id: movieData.id,
						title: movieData.titleHi,
						description: movieData.descriptionHi,
						language: movieData.languageHi,
						rating: movieData.rating,
						photo: movieData.photo
					} as Movie
				}
			});
		}
		return movieArray;
	}
}