import { Component, OnInit , Input} from '@angular/core';

import { Hotel } from '../Hotel';
import { HotelService } from '../hotel.service';
import { Quarto } from '../Quarto';
import { QuartoService } from '../quarto.service';
import { TipoQuarto } from '../TipoQuarto';

import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import { DataService } from '../data.service';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css'],
  template: '<room-type-details [message]="message"></room-type-details>',
  // template: '<room-type-details></room-type-details>',
})
export class HotelDetailComponent implements OnInit {

  @Input() hotel: Hotel;
  @Input() quartos: Quarto[];
  @Input() servicos: string[];
  tipos: string[];
  message = 'heloo';



  constructor(private route: ActivatedRoute,
              private data: DataService,
              private hotelService: HotelService,
              private quartoService: QuartoService,
              private location: Location) { }

  ngOnInit(): void {
    this.getHotel();
    // this.data.currentMessage.subscribe(message => this.message = message);
    // this.newInfo();
  }

  newInfo() {
    this.data.changeType(null);
    this.data.changeRooms(null);
  }

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
    // const rooms=getRoom(type);

    for (const quarto of this.getRoom(type)) {
      if (quarto.precoBaixo < price) {
        price = quarto.precoBaixo;
      }
    }
    return price;
  }

  public lowestPrice(): any {
    let price = 1000000;
    // const rooms=getRoom(type);
    for (const quarto of this.quartos) {
      if (quarto.precoBaixo < price) {
        price = quarto.precoBaixo;
      }
    }
    return price;
  }

  public getExpRoom(type): any {
    let price = 0;
    // const rooms=getRoom(type);

    for (const quarto of this.getRoom(type)) {
      if (quarto.precoBaixo > price) {
        price = quarto.precoBaixo;
      }
    }
    return price;
  }

  public numeroQuartos(): any {
    return this.quartos.length;
  }

  public getRoomTypes(): any {
    const v: Array<TipoQuarto> = [];

    for (const quarto of this.quartos) {
      if (!v.includes( quarto.tipoQuarto)) {
        v.push( quarto.tipoQuarto);
      }
    }
    return v;
  }

  public getRoom(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q;
  }

  public getSingleRoom(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q[0];
  }

  public getRoomNumber(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q.length;
  }

  public alteraTipo(tipo: any) {
    this.data.changeType(tipo);
    this.data.changeRooms(this.getRoom(tipo));
  }

  private getRoomsBetween(min, max, type): any {

  }

  private getRoomMin(min): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.precoBaixo > min || quarto.precoAlto > min;
    });
    return q;
  }

  private getRoomMax(max): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.precoBaixo < max || quarto.precoAlto < max;
    });
    return q;
  }

  private getRoomMinMax(min, max): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.precoBaixo < max || quarto.precoAlto < max;
    });
    return q;
  }
}
