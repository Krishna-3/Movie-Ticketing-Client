import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Subscription, switchMap } from 'rxjs';
import { TicketResponse } from '../interfaces/ticket';
import { ParseService } from '../services/parse.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
	selector: 'app-ticket',
	templateUrl: './ticket.component.html',
	styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	subscription2!: Subscription;

	tickets!: TicketResponse[];

	constructor(private ticketService: TicketService,
		private localStorageService: LocalStorageService,
		private parseService: ParseService) { }

	ngOnInit(): void {
		this.subscription1 = this.ticketService.getTickets().subscribe({
			next: data => this.tickets = this.parseService.parseTickets(this.localStorageService.get('language') as string, data),
			error: err => console.log(err)
		})
	}

	ngOnDestroy(): void {
		if (this.subscription1) {
			this.subscription1.unsubscribe();
		}
		if (this.subscription2) {
			this.subscription2.unsubscribe();
		}
	}
}