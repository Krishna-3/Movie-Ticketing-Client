import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RequestInterceptor } from './services/request.interceptor';
import { TheatresComponent } from './theatres/theatres.component';
import { TheatreComponent } from './theatre/theatre.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { TicketComponent } from './ticket/ticket.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		SignupComponent,
		LoginComponent,
		HomeComponent,
		NotFoundComponent,
		TheatresComponent,
		TheatreComponent,
		DisableControlDirective,
		TicketComponent,
		ProfileComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
  BrowserAnimationsModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: RequestInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
