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
import { MovieTheatreComponent } from './movie-theatre/movie-theatre.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [
		LocationComponent,
		AdminComponent,
		TheatreComponent,
		MovieComponent,
		MovieLocationComponent,
		MovieTheatreComponent
	],
	imports: [
		CommonModule,
		AdminRoutingModule,
		ReactiveFormsModule,
		HttpClientModule,
		MatFormFieldModule,
		MatInputModule,
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatDividerModule
	]
})
export class AdminModule { }
