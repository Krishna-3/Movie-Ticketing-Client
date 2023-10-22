import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { AdminComponent } from './admin/admin.component';
import { TheatreComponent } from './theatre/theatre.component';
import { MovieComponent } from './movie/movie.component';
import { MovieLocationComponent } from './movie-location/movie-location.component';
import { MovieTheatreComponent } from './movie-theatre/movie-theatre.component';
import { adminGuard } from '../guards/admin.guard';
import { userGuard } from '../guards/user.guard';

const routes: Routes = [
	{ path: 'location', component: LocationComponent, canActivate: [userGuard, adminGuard] },
	{ path: 'admin', component: AdminComponent, canActivate: [userGuard, adminGuard] },
	{ path: 'theatre', component: TheatreComponent, canActivate: [userGuard, adminGuard] },
	{ path: 'movie', component: MovieComponent, canActivate: [userGuard, adminGuard] },
	{ path: 'movie-location', component: MovieLocationComponent, canActivate: [userGuard, adminGuard] },
	{ path: 'movie-theatre', component: MovieTheatreComponent, canActivate: [userGuard, adminGuard] },
	{ path: '', component: AdminComponent, canActivate: [userGuard, adminGuard] },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
