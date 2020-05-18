import {Component, Input, OnChanges, OnInit} from '@angular/core';

import {Hotel} from '../interfaces/Hotel';
import {HotelService} from '../hotel.service';
import {Quarto} from '../interfaces/Quarto';
import {QuartoService} from '../quarto.service';
import {TipoQuarto} from '../interfaces/TipoQuarto';

import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import {DataService} from '../data.service';

import {Reserva} from '../interfaces/Reserva';
import {ReservaService} from '../reserva.service';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  @Input() hotel: Hotel;
  @Input() quartos: Quarto[];
  @Input() servicos: string[];
  show: boolean;
  precoMinimo = 0;
  precoMaximo = 0;
  botaoR: boolean;
  dataInicial: Date;
  dataFinal: Date;
  reservas: Reserva[];
  id: string;
  myStorage = window.localStorage;
  tipo: string;
  esconderDatas: boolean;

  constructor(private route: ActivatedRoute,
              private data: DataService,
              private hotelService: HotelService,
              private quartoService: QuartoService,
              private location: Location,
              private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.getHotel();
    this.getReservasDoHotel();
    this.show = false;
    this.botaoR = false;
    this.esconderDatas = true;
  }

  public getHotel(): void {
    this.route.params.subscribe((routeParams) => {
      this.id = routeParams.hotelID;
      this.hotelService
        .getHotel(this.id)
        .subscribe(
          (response) => (
            (this.hotel = response.hotel), (this.quartos = response.hotel_rooms)
          )
        );
    });
  }

  private getReservasDoHotel(): void {
    this.reservaService.getReservas().subscribe(response => this.reservas = response.reservas_list);
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

  public numeroQuartos(): any {
    return this.quartos.length;
  }

  public getRooms(): any {
    const v: Array<TipoQuarto> = [];
    for (const quarto of this.quartos) {
      if (!v.includes(quarto.tipoQuarto)) {
        if (this.inPrice(quarto) && this.inDate(quarto)) {
          v.push(quarto.tipoQuarto);
        }
      }
    }
    return v;
  }

  public inPrice(quarto): boolean {
    if (this.precoMinimo < this.precoMaximo) {
      return ((this.precoMinimo <= quarto.precoBaixo) && (quarto.precoBaixo <= this.precoMaximo))
        || ((this.precoMinimo <= quarto.precoAlto) && (quarto.precoAlto <= this.precoMaximo)) ;
    } else {
      return true;
    }
  }

  public inDate(quarto): any {
    const di = new Date(this.dataInicial);
    const df = new Date(this.dataFinal);
    const da = new Date();
    const dat = new Date(da.getTime() - (1000 * 60 * 60 * da.getHours()));

    if (di < df && (di >= dat)) {
      this.mostraBotao();
      const q = this.reservas.filter(reserva => reserva.quarto === quarto);
      if (q.length === 0) {
        return true;
      } else {
        for (const reserva of q) {
          const ri = new Date(reserva.checkin);
          const rf = new Date(reserva.checkout);
          if ((df > ri) || (di < rf)) {
            return false;
          }
        }
        return true;
      }
    }
    return true;
  }

  public mostraBotao(): void {
    this.botaoR = true;
  }

  public mostraReserva(): void {
    if (this.myStorage.length === 0) {
      window.alert('Tem de fazer login ou registar-se primeiro');
    } else {
      if (this.tipo) {
        this.show = true;
        this.esconderDatas = false;
      }
    }
  }

}
