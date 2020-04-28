import { Component, OnInit } from '@angular/core';

import { Hotel } from '../interfaces/Hotel';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hotelList : Hotel[]

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.getHotels();
  }

  private getHotels() {
    this.hotelService.getHotels().subscribe(response => this.hotelList = response.hotel_list)
  }

  private chooseImage(): void{

  }
}
