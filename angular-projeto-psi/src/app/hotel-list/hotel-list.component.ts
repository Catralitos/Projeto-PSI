import { Component, OnInit } from '@angular/core';

import { Hotel } from '../Hotel';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hotelList: Hotel[];

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.getHotels();
  }

  private getHotels() {
    this.hotelService.getHotels().subscribe(response => this.hotelList = response.hotel_list);
  }

  public imgAleatoria(hotel) {
    return hotel.imagens[this.randomInt(0, hotel.imagens.length-1)];
  }

  private randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
