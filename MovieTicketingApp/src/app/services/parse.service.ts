import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Theatre } from '../interfaces/theatre';
import { LocalStorageService } from './local-storage.service';
import { TicketResponse } from '../interfaces/ticket';

@Injectable({
	providedIn: 'root'
})
export class ParseService {

	constructor(private localStorageService: LocalStorageService) { }

	parseMovies(res: Object) {
		let movieArray: Movie[] = [];

		if (Array.isArray(res)) {
			this.localStorageService.set('language', res[0].type)
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

	parseTheatres(res: Object) {
		let theatreArray: Theatre[] = [];

		if (Array.isArray(res)) {
			this.localStorageService.set('language', res[0].type)
			theatreArray = res.map((theatreData) => {

				if (theatreData.type === "en") {
					return {
						id: theatreData.id,
						name: theatreData.nameEn
					} as Theatre
				}

				else if (theatreData.type === "te") {
					return {
						id: theatreData.id,
						name: theatreData.nameTe
					} as Theatre
				}
				else {
					return {
						id: theatreData.id,
						name: theatreData.nameHi
					} as Theatre
				}
			});
		}
		return theatreArray;
	}

	parseTickets(language: string, res: Object) {
		let ticketArray: TicketResponse[] = [];

		if (Array.isArray(res)) {

			if (language === 'en') {
				ticketArray = res.map(t => {
					return {
						seat: t.seat,
						time: t.time,
						movieTheatre: {
							id: t.movieTheatre.id,
							movieId: t.movieTheatre.movieId,
							theatreId: t.movieTheatre.theatreId,
							movie: {
								id: t.movieTheatre.movie.id,
								title: t.movieTheatre.movie.titleEn,
								rating: t.movieTheatre.movie.rating,
								description: t.movieTheatre.movie.descriptionEn,
								language: t.movieTheatre.movie.languageEn,
								photo: t.movieTheatre.movie.photo,
							},
							theatre: {
								id: t.movieTheatre.theatre.id,
								name: t.movieTheatre.theatre.nameEn,
								location: t.movieTheatre.theatre.location
							}
						}
					}
				})
			}

			else if (language === 'hi') {
				ticketArray = res.map(t => {
					return {
						seat: t.seat,
						time: t.time,
						movieTheatre: {
							id: t.movieTheatre.id,
							movieId: t.movieTheatre.movieId,
							theatreId: t.movieTheatre.theatreId,
							movie: {
								id: t.movieTheatre.movie.id,
								title: t.movieTheatre.movie.titleHi,
								rating: t.movieTheatre.movie.rating,
								description: t.movieTheatre.movie.descriptionHi,
								language: t.movieTheatre.movie.languageHi,
								photo: t.movieTheatre.movie.photo,
							},
							theatre: {
								id: t.movieTheatre.theatre.id,
								name: t.movieTheatre.theatre.nameHi,
								location: t.movieTheatre.theatre.location
							}
						}
					}
				})
			}

			else {
				ticketArray = res.map(t => {
					return {
						seat: t.seat,
						time: t.time,
						movieTheatre: {
							id: t.movieTheatre.id,
							movieId: t.movieTheatre.movieId,
							theatreId: t.movieTheatre.theatreId,
							movie: {
								id: t.movieTheatre.movie.id,
								title: t.movieTheatre.movie.titleTe,
								rating: t.movieTheatre.movie.rating,
								description: t.movieTheatre.movie.descriptionTe,
								language: t.movieTheatre.movie.languageTe,
								photo: t.movieTheatre.movie.photo,
							},
							theatre: {
								id: t.movieTheatre.theatre.id,
								name: t.movieTheatre.theatre.nameTe,
								location: t.movieTheatre.theatre.location
							}
						}
					}
				})
			}
		}

		return ticketArray;
	}
}