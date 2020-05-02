import { Component, OnInit , Input} from '@angular/core';

import { Hotel } from '../Hotel';
import {HotelService} from '../hotel.service';
import { Quarto } from '../Quarto';
import {QuartoService} from '../quarto.service';
import { TipoQuarto } from '../TipoQuarto';

import { DataService } from '../data.service';

import {Location} from '@angular/common';

import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-room-type-details',
  templateUrl: './room-type-details.component.html',
  styleUrls: ['./room-type-details.component.css']
})
export class RoomTypeDetailsComponent implements OnInit {

  //obter quartos para fazer contagens
  tipo: string;
  hotel: Hotel;
  quartos: Quarto[];
  servicos: string[];


  constructor(private route: ActivatedRoute,
              private hotelService: HotelService,
              private data: DataService,
              private quartoService: QuartoService,
              private location: Location) { }

  ngOnInit(): void {
    // this.getQuarto();
    this.tipo = this.route.snapshot.url[1].path;
    // this.data.currentType.subscribe(message => this.tipos = message);
    // this.data.currentRooms.subscribe(message => this.quartos = message);
    this.getHotel();
  }

  /*private getQuarto() { //obter quartos consoante um tipo de quarto
    const id = this.route.snapshot.paramMap.get('id');
    this.quartoService.get
      .subscribe(response => ());
  }*/
  getHotel(): void {
    const id = this.route.snapshot.url[0].path;
    this.hotelService.getHotel(id)
      .subscribe(response => (this.hotel = response.hotel,
        this.quartos = response.hotel_rooms));
  }

  private goBack(): void {
    this.location.back();
  }

  public getCheapestRoom(type): any {
    let price = 1000000;
    //const rooms=getRoom(type);

    for (const quarto of this.getRoom(type)) {
      if (quarto.precoBaixo <price) {
        price = quarto.precoBaixo;
      }
    }
    return price;
  }

  public getExpRoom(type): any {
    let price = 0;
    //const rooms=getRoom(type);

    for (const quarto of this.getRoom(type)) {
      if (quarto.precoBaixo >price) {
        price = quarto.precoBaixo;
      }
    }
    return price;
  }

  public getRoom(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q;
  }

  public getRoomNumber(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q.length;
  }
}
