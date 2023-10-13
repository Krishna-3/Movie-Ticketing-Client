import { Injectable } from '@angular/core';
import { Ticket } from '../interfaces/ticket';

@Injectable({
	providedIn: 'root'
})
export class TicketService {

	ticket: Ticket = {
		SeatId: 0,
		MovieId: 0,
		TheatreId: 0,
		UserId: 0,
		timeId: 0,
		date: ''
	};

	constructor() { }
}
