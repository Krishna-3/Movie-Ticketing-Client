import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TheatreName } from '../interfaces/adminInterfaces';

@Injectable({
	providedIn: 'root'
})
export class AdminTheatreService {

	constructor(private http: HttpClient) { }

	getTheatres() {
		return this.http.get("https://localhost:7064/Theatre/all");
	}

	createTheatre(theatreName: TheatreName, locationId: number) {
		return this.http.post("https://localhost:7064/Theatre?locationId=" + locationId, theatreName);
	}

	updateTheatreName(theatreName: TheatreName, theatreId: number) {
		return this.http.patch("https://localhost:7064/Theatre/name/" + theatreId, theatreName);
	}

	updateTheatreLocation(locationId: number, theatreId: number) {
		return this.http.patch(`https://localhost:7064/Theatre/location/${theatreId}?locationId=${locationId}`, null);
	}

	deleteTheatre(theatreId: number) {
		return this.http.delete(`https://localhost:7064/Theatre/${theatreId}`);
	}
}