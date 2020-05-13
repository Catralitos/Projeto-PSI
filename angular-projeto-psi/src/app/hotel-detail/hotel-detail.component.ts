import { Component, OnInit , Input} from '@angular/core';

import { Hotel } from '../interfaces/Hotel';
import { HotelService } from '../hotel.service';
import { Quarto } from '../interfaces/Quarto';
import { QuartoService } from '../quarto.service';
import { TipoQuarto } from '../interfaces/TipoQuarto';

import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import { DataService } from '../data.service';

import { Reserva } from '../interfaces/Reserva';
import { ReservaService } from '../reserva.service';



@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  @Input() hotel: Hotel;
  @Input() quartos: Quarto[];
  @Input() servicos: string[];
  tipos: string[];
  quartosB: Quarto[];
  show: boolean;
  precoMinimo = 0;
  precoMaximo = 0;
  botaoR: boolean;
  dataInicial: Date;
  dataFinal: Date;
  reservas: Reserva[];



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
  }

  public getTipoCerto(tipo): any {
    return tipo.split(/(?=[A-Z])/).join(' ');
  }

  public getHotel(): void {
    const id = this.route.snapshot.url[0].path;
    this.hotelService.getHotel(id)
      .subscribe(response => (this.hotel = response.hotel,
        this.quartos = response.hotel_rooms));
  }

  private getReservasDoHotel(): void {
    let allR;
    this.reservaService.getReservas().subscribe(response => this.reservas = response.reservas_list);
    /*this.reservas.filter()
    for (const reserva of allR) {
      if (reserva.quarto.hotel === this.hotel) {
        this.reservas.push(reserva);
      }
    }*/
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
    if (this.precoMinimo < this.precoMaximo) {
      for (const quarto of this.quartos) {
        if (!v.includes(quarto.tipoQuarto)
          && ( ((this.precoMinimo <= quarto.precoBaixo) && (quarto.precoBaixo <= this.precoMaximo))
            || ((this.precoMinimo <= quarto.precoAlto) && (quarto.precoAlto <= this.precoMaximo)))) {
          v.push(quarto.tipoQuarto);
        }
      }
    } else {
      for (const quarto of this.quartos) {
        if (!v.includes(quarto.tipoQuarto)) {
          v.push(quarto.tipoQuarto);
        }
      }
    }
    return v;
  }

  public getRoomTypesByDate(): any {
    const t: Array<TipoQuarto> = [];
    let di = new Date(this.dataInicial);
    let df = new Date(this.dataFinal);
    let da = new Date();
    let dat = new Date(da.getTime()- (1000*60*60*da.getHours()))

    if (di < df && (di >= dat)) {
      this.mostraBotao();
      for (const quarto of this.quartos) {
          if (!t.includes(quarto.tipoQuarto)) {
            if (this.reservas.length === 0) {
              t.push(quarto.tipoQuarto);
            } else {
              for (const reserva of this.reservas) {
                if (df < reserva.checkin
                  && di > reserva.checkout) {
                  t.push(quarto.tipoQuarto);
                }
              }
            }
          }
        }
    }
    return t;
  }

  getRoom(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q;
  }

  public getSingleRoom(type): any {
    // tslint:disable-next-line:only-arrow-functions
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

  public getRoomsBetween(min, max): any {
    if (min && !max) {
      return this.getRoomMin(min);
    }
    if (!min && max) {
      return this.getRoomMax(max);
    }
    if (max && min) {
      return this.getRoomMinMax(min, max);
    }
  }

  private getRoomMin(min): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.precoBaixo >= min || quarto.precoAlto >= min;
    });
    return q;
  }

  private getRoomMax(max): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.precoBaixo <= max || quarto.precoAlto <= max;
    });
    return q;
  }

  private getRoomMinMax(min, max): any {
    const q = this.quartos.filter(function(quarto) {
      return (quarto.precoBaixo >= min || quarto.precoAlto >= min) &&
        (quarto.precoBaixo <= max || quarto.precoAlto <= max);
    });
    return q;
  }

  getTypesList(quartos: Quarto[]): any{
    const v: Array<TipoQuarto> = [];

    for (const quarto of quartos) {
      if (!v.includes( quarto.tipoQuarto)) {
        v.push( quarto.tipoQuarto);
      }
    }
    return v;
  }

  public getRooms(quartos , type): any {
    const q = quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q;
  }

  public hotelId(): string {
    return this.route.snapshot.url[0].path;
  }

  public mostraBotao(): void {
    this.botaoR = true;
  }

  public mostraReserva(): void {
    this.show = true;
  }

  public numDias(): any {
    return this.dataFinal.getTime() - this.dataInicial.getTime();
  }
}
