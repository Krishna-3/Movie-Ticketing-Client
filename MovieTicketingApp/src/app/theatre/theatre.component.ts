import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Observable, Subscription, map, switchMap } from 'rxjs';
import { Seat } from '../interfaces/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../services/jwt.service';
import { LocalStorageService } from '../services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-theatre',
	templateUrl: './theatre.component.html',
	styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit, OnDestroy {

	subscription1!: Subscription;

	subscription2!: Subscription;

	seats$!: Observable<Seat[]>;

	seats: Seat[] = [];

	seatForm!: FormGroup;

	requiredSeats: number = 0;

	seatCount: number[] = [];

	bookedSeats!: number[];

	constructor(private movieService: MovieService,
		private route: ActivatedRoute,
		private ticketService: TicketService,
		private fb: FormBuilder,
		private jwtService: JwtService,
		private localStorageService: LocalStorageService,
		private router: Router,
		private snackbar: MatSnackBar) { }

	ngOnInit(): void {
		this.seats$ = this.route.params.pipe(
			switchMap(params => {
				this.ticketService.ticket.MovieId = params['movieId'];
				this.ticketService.ticket.TheatreId = params['theatreId'];
				return this.movieService.getSeats(this.ticketService.ticket) as Observable<Seat[]>
			})
		);

		this.subscription1 = this.seats$.subscribe({
			next: data => {
				this.seats = data as Seat[];
				for (let i = 0; i < this.seats.length; i++) {
					this.seatCount.push(i + 1)
				}
			},
			error: err => {
				if ('message' in err.error)
					return this.snackbar.open(err.error.message[0], 'ok')
				if ('title' in err.error)
					return this.snackbar.open(err.error.title, 'ok')
				return this.snackbar.open('error occured', 'ok')
			}
		});

		this.seatForm = this.fb.group({
			seat1: new FormControl(''),
			seat2: new FormControl(''),
			seat3: new FormControl(''),
			seat4: new FormControl(''),
			seat5: new FormControl(''),
		});
	}

	book() {
		this.bookedSeats = [];
		for (const seat in this.seatForm.value) {
			const seatId = parseInt(this.seatForm.get(seat)?.value)
			if (!Number.isNaN(seatId)) {
				this.bookedSeats.push(seatId)
			}
		}

		if (this.bookedSeats.length === 0) {
			return
		}

		const userId = this.jwtService.getId(this.localStorageService.get('accessToken') as string);
		this.ticketService.ticket.UserId = parseInt(userId as string);

		this.subscription2 = this.ticketService.bookTicket(this.ticketService.ticket, this.bookedSeats).subscribe({
			next: data => this.router.navigate(['/ticket']),
			error: err => {
				if ('message' in err.error)
					return this.snackbar.open(err.error.message[0], 'ok')
				if ('title' in err.error)
					return this.snackbar.open(err.error.title, 'ok')
				return this.snackbar.open('error occured', 'ok')
			}
		});
	}

	setRequiredSeats(seats: number) {
		this.requiredSeats = seats;
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