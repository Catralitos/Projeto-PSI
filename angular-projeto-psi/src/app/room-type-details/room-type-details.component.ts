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
  @Input() tipo: string;
  hotel: Hotel;
  quartos: Quarto[];
  show: boolean;

  constructor(private route: ActivatedRoute,
              private hotelService: HotelService,
              private data: DataService,
              private quartoService: QuartoService,
              private location: Location) { }

  ngOnInit(): void {
      this.getHotel();
      this.show = false;
  }

  public getHotel(): void {
    const id = this.route.snapshot.url[0].path;
    this.hotelService.getHotel(id)
      .subscribe(response => (this.hotel = response.hotel,
        this.quartos = response.hotel_rooms));
  }

  public getNumRoom(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q.length;
  }

  public getRoom(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q[0];
  }

  public getTipoCerto(tipo): any {
    return tipo.split(/(?=[A-Z])/).join(' ');
  }

  public verServicos(): void {
    this.show = !this.show;
  }
}
