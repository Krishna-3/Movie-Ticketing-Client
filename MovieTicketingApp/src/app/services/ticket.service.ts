import { Injectable } from '@angular/core';
import { TicketId } from '../interfaces/ticket';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class TicketService {

	ticket: TicketId = {
		SeatId: 0,
		MovieId: 0,
		TheatreId: 0,
		UserId: 0,
	};

	constructor(private http: HttpClient,
		private localStorageService: LocalStorageService) { }

	bookTicket(ticket: TicketId) {
		const timeId = this.localStorageService.get('timeId');
		const date = this.localStorageService.get('date');
		return this.http.post(`https://localhost:7064/Ticket/${timeId}?date=${date}`, ticket);
	}
}
