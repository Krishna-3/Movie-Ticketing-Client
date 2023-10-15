import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location/location.component';
import { HomeComponent } from '../home/home.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'location', component: LocationComponent },
  { path: 'admin', component: AdminComponent },
  { path: '', component: AdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
