import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { Seat } from '../interfaces/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../services/jwt.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
	selector: 'app-theatre',
	templateUrl: './theatre.component.html',
	styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	subscription2!: Subscription;

	seats$!: Observable<Seat[]>;

	seats!: Seat[];

	seatForm!: FormGroup;

	constructor(private movieService: MovieService,
		private route: ActivatedRoute,
		private ticketService: TicketService,
		private fb: FormBuilder,
		private jwtService: JwtService,
		private localStorageService: LocalStorageService,
		private router: Router) { }

	ngOnInit(): void {
		this.seats$ = this.route.params.pipe(
			switchMap(params => {
				this.ticketService.ticket.MovieId = params['movieId'];
				this.ticketService.ticket.TheatreId = params['theatreId'];
				return this.movieService.getSeats(this.ticketService.ticket) as Observable<Seat[]>
			})
		);

		this.subscription1 = this.seats$.subscribe({
			next: data => this.seats = data as Seat[],
			error: err => console.log(err)
		});

		this.seatForm = this.fb.group({
			seat: new FormControl('', { validators: Validators.required })
		});
	}

	book() {
		this.ticketService.ticket.SeatId = this.seatForm.get('seat')?.value;
		const userId = this.jwtService.getId(this.localStorageService.get('accessToken') as string);
		this.ticketService.ticket.UserId = parseInt(userId as string);

		this.subscription2 = this.ticketService.bookTicket(this.ticketService.ticket).subscribe({
			next: data => this.router.navigate(['/ticket']),
			error: err => console.log(err)
		});
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