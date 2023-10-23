import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Subscription, switchMap } from 'rxjs';
import { TicketResponse } from '../interfaces/ticket';
import { ParseService } from '../services/parse.service';
import { LocalStorageService } from '../services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-ticket',
	templateUrl: './ticket.component.html',
	styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	tickets!: TicketResponse[];

	err!: number

	constructor(private ticketService: TicketService,
		private localStorageService: LocalStorageService,
		private parseService: ParseService,
		private snackbar: MatSnackBar) { }

	ngOnInit(): void {
		this.subscription1 = this.ticketService.getTickets().subscribe({
			next: data => this.tickets = this.parseService.parseTickets(this.localStorageService.get('language') as string, data),
			error: err => {
				this.err = err.status;
				if ('message' in err.error)
					return this.snackbar.open(err.error.message[0], 'ok')
				if ('title' in err.error)
					return this.snackbar.open(err.error.title, 'ok')
				return this.snackbar.open('error occured', 'ok')
			}
		});
	}

	ngOnDestroy(): void {
		if (this.subscription1) {
			this.subscription1.unsubscribe();
		}
	}
}