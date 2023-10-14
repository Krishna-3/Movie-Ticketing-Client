import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TicketId } from '../interfaces/ticket';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(private http: HttpClient,
        private localStorageService: LocalStorageService) { }

    getMovies() {
        return this.http.get("https://localhost:7064/Movie");
    }

    getLocations() {
        return this.http.get("https://localhost:7064/Location");
    }

    setLocation(city: string) {
        return this.http.post(`https://localhost:7064/State/location?city=${city}`, null);
    }

    setLanguage(languageCode: string) {
        return this.http.post(`https://localhost:7064/State/language?languageCode=${languageCode}`, null);
    }

    getTheatres(movieId: number) {
        return this.http.get(`https://localhost:7064/Theatre/movie/${movieId}`);
    }

    getSeats(ticket: TicketId) {
        const timeId = this.localStorageService.get('timeId');
        const date = this.localStorageService.get('date');
        return this.http.post(`https://localhost:7064/Seat/${timeId}?date=${date}`, ticket);
    }
}