import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {HotelListComponent} from './hotel-list/hotel-list.component';
import {HotelDetailComponent} from './hotel-detail/hotel-detail.component';
import {RoomTypeDetailsComponent} from './room-type-details/room-type-details.component';
import {ReservaComponent} from './reserva/reserva.component';
import {RegistarComponent} from './registar/registar.component';

const routes: Routes = [
  { path: '', component: HotelListComponent },
  { path: 'registar', component: RegistarComponent },
  { path: ':hotelName', component: HotelDetailComponent },
  // { path: ':hotelName/:tipoQuarto', component: RoomTypeDetailsComponent },
  { path: ':hotelName/:reserva', component: ReservaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
