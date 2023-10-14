import { Movie, Seat } from "./movie"
import { TheatreWithLocation } from "./theatre"

export interface TicketId {
    SeatId: number,
    MovieId: number,
    TheatreId: number,
    UserId: number,
}

export interface TicketResponse {
    movieTheatre: {
        id: number,
        movieId: number,
        theatreId: number,
        movie: Movie,
        theatre: TheatreWithLocation
    },
    seat: Seat,
    time: Date
}