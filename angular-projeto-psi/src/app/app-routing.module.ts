import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {HotelListComponent} from './hotel-list/hotel-list.component';
import {HotelDetailComponent} from './hotel-detail/hotel-detail.component';
import {RoomTypeDetailsComponent} from './room-type-details/room-type-details.component';


const routes: Routes = [
  { path: '', component: HotelListComponent },
  { path: ':hotelName', component: HotelDetailComponent },
  { path: ':hotelName/:tipoQuarto', component: RoomTypeDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
