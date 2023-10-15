import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from 'src/app/interfaces/movie';

@Injectable({
	providedIn: 'root'
})
export class AdminLocationService {

	constructor(private http: HttpClient) { }

	getLocations() {
		return this.http.get("https://localhost:7064/Location");
	}

	createLocation(location: City) {
		return this.http.post("https://localhost:7064/Location", location);
	}

	updateLocation(location: City) {
		return this.http.put(`https://localhost:7064/Location`, location);
	}

	deleteLocation(locationId: number) {
		return this.http.delete(`https://localhost:7064/Location/${locationId}`);
	}
}