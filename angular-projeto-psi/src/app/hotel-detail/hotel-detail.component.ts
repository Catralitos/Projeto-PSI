import { Component, OnInit , Input} from '@angular/core';

import { Hotel } from '../Hotel';
import { HotelService } from '../hotel.service';
import { Quarto } from '../Quarto';
import { QuartoService } from '../quarto.service';
import { Servico } from '../Servico';
import { TipoQuarto } from '../TipoQuarto';

import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  @Input() hotel: Hotel;
  @Input() quartos: Quarto[];
  @Input() servicos: Servico[];
  @Input() tipos: TipoQuarto;


  constructor(private route: ActivatedRoute,
              private hotelService: HotelService,
              private quartoService: QuartoService,
              private location: Location) { }

  ngOnInit(): void {
    this.getHotel();
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

  getCheapestRoom(): void {

  }

  length(): any {
    return 1;
  }

  /*getRoomsFromType(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q;
  }*/
}
