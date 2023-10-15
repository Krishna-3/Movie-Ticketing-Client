import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LocationComponent } from './location/location.component';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TheatreComponent } from './theatre/theatre.component';
import { MovieComponent } from './movie/movie.component';
import { MovieLocationComponent } from './movie-location/movie-location.component';


@NgModule({
	declarations: [
		LocationComponent,
		AdminComponent,
		TheatreComponent,
		MovieComponent,
  MovieLocationComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		ReactiveFormsModule,
		HttpClientModule
	]
})
export class AdminModule { }
