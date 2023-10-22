import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TheatresComponent } from './theatres/theatres.component';
import { TheatreComponent } from './theatre/theatre.component';
import { TicketComponent } from './ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { userGuard } from './guards/user.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
	{ path: 'home', component: HomeComponent, canActivate: [userGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'movie/:movieId', component: TheatresComponent, canActivate: [userGuard] },
	{ path: 'movie/:movieId/theatre/:theatreId', component: TheatreComponent, canActivate: [userGuard] },
	{ path: 'ticket', component: TicketComponent, canActivate: [userGuard] },
	{ path: 'profile', component: ProfileComponent, canActivate: [userGuard] },
	{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(e => e.AdminModule), canActivate: [userGuard, adminGuard], canMatch: [adminGuard] },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '**', component: NotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
