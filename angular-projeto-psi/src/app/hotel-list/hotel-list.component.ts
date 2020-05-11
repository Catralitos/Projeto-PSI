import { Component, OnInit } from '@angular/core';

import { Hotel } from '../interfaces/Hotel';
import { HotelService } from '../hotel.service';
import {DataService} from "../data.service";

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hotelList: Hotel[];
  message: string;

  constructor(private hotelService: HotelService,
              private data: DataService) { }

  ngOnInit(): void {
    this.getHotels();
    //this.data.currentId.subscribe(message => this.message = message);
  }

  private getHotels() {
    this.hotelService.getHotels().subscribe(response => this.hotelList = response.hotel_list);
  }

  public primeiraFrase(descricao) {
    return descricao.split('.')[0] + '.';
  }

  public imgAleatoria(hotel) {
    return hotel.imagens[this.randomInt(0, hotel.imagens.length - 1)];
  }

  private randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
