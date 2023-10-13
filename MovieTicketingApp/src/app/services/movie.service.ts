import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MovieService {

    constructor(private http: HttpClient) { }

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
}