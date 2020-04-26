import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: HotelListComponent },
  { path: ':hotelName', component: HotelDetailsComponent }
  { path: ':hotelName/:tipoQuarto', component: HotelRoomDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
