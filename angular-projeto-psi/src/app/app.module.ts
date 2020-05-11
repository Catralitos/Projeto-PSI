import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { RoomTypeDetailsComponent } from './room-type-details/room-type-details.component';

import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { RoomsByDateComponent } from './rooms-by-date/rooms-by-date.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    HotelDetailComponent,
    HotelListComponent,
    RoomTypeDetailsComponent,
    RoomsByDateComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
