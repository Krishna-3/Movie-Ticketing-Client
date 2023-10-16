import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { AdminComponent } from './admin/admin.component';
import { TheatreComponent } from './theatre/theatre.component';
import { MovieComponent } from './movie/movie.component';
import { MovieLocationComponent } from './movie-location/movie-location.component';
import { MovieTheatreComponent } from './movie-theatre/movie-theatre.component';

const routes: Routes = [
	{ path: 'location', component: LocationComponent },
	{ path: 'admin', component: AdminComponent },
	{ path: 'theatre', component: TheatreComponent },
	{ path: 'movie', component: MovieComponent },
	{ path: 'movie-location', component: MovieLocationComponent },
	{ path: 'movie-theatre', component: MovieTheatreComponent },
	{ path: '', component: AdminComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
