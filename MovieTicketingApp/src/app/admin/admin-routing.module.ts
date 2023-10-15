import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { AdminComponent } from './admin/admin.component';
import { TheatreComponent } from './theatre/theatre.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: 'location', component: LocationComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'theatre', component: TheatreComponent },
  { path: 'movie', component: MovieComponent },
  { path: '', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
