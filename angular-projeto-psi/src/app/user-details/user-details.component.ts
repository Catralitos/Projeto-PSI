import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { Reserva } from '../interfaces/Reserva';
import {ReservaService} from '../reserva.service';
import { Cliente } from '../interfaces/Cliente';

import {Hotel} from '../interfaces/Hotel';
import {HotelService} from '../hotel.service';
import {Quarto} from '../interfaces/Quarto';
import {QuartoService} from '../quarto.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  reservas: Reserva[];
  cliente: Cliente;
  quarto: Quarto;
  hotel: Hotel;

  precoMinimo: Number;
  precoMaximo: Number;
  dataInicial: Date;
  dataFinal: Date;

  constructor(private route: ActivatedRoute,
              private reservaService: ReservaService,
              private hotelService: HotelService,
              private quartoService: QuartoService) { }

  myStorage = window.localStorage;

  ngOnInit(): void {
    this.getReservas();
    this.precoMinimo=0;
    this.dataInicial= new Date("01-01-1111");
    this.dataFinal = new Date("01-01-1111");
  }

  getCliente() {
    throw new Error("Method not implemented.");
  }
  getReservas() {
    let allR: Reserva[];
    this.reservaService.getReservas().subscribe(response => this.reservas = response.reservas_list);
    //this.reservas = allR.filter(reserva => reserva.nif === +this.myStorage.getItem('nif'));
  }

  getMyRes(){
    return this.reservas.filter(reserva => reserva.nif === +this.myStorage.getItem('nif'));
  }

  /*getRoom(id: Quarto){
    this.quartoService.getQuarto(id.toString()).subscribe(response => this.quarto = response.quarto);
    return this.quarto;
  }*/

 /* getHotel(){
    
    this.hotelService.getHotel(this.quarto.hotel)
      //  .subscribe((response) => { this.hotel = response.hotel;} );
    
    //return hotel;
  }*/

  getRoomType(id: string){
    let quarto: Quarto;
    this.quartoService.getQuarto(id).subscribe(response => quarto = response);
    return quarto.tipoQuarto;
  }

  public getResByDatePrice(): any {
    let v: Array<Reserva> = [];
    const di = new Date(this.dataInicial);
    const df = new Date(this.dataFinal);
    if ( (this.precoMinimo>=0 )  && (this.dataInicial <=new Date("01-01-1112")) && (this.dataFinal <=new Date("01-01-1112"))) {
      for (const reserva of this.getMyRes()) {
        if (this.precoMinimo <= reserva.preco) {
          v.push(reserva);
        }
      }
    }/*else if ( (this.precoMinimo==0 && this.precoMaximo==0) && (this.dataInicial!=new Date("01-01-1111")) && (this.dataFinal!=new Date("01-01-1111"))
      && di < df ) {
      for (const reserva of this.getMyRes()) {
        const ri = new Date(reserva.checkin);
        const rf = new Date(reserva.checkout);
        if (!v.includes(reserva) && ( (ri <= di) && (di <= rf))) {
          v.push(reserva);
        }
      }
    } else if((this.precoMinimo>=0 && this.precoMaximo>0) &&(this.precoMinimo < this.precoMaximo)
        && (this.dataInicial) && (this.dataFinal) && di < df ){
          for (const reserva of this.getMyRes()) {
            const ri = new Date(reserva.checkin);
        const rf = new Date(reserva.checkout);
            if (!v.includes(reserva) && ( ((this.precoMinimo <= reserva.preco) 
            && (reserva.preco <= this.precoMaximo) && ( (ri <= di) && (di <= rf))))) {
              v.push(reserva);
            }
          }
    } */
    if ( (this.precoMinimo==0 ) && (this.dataInicial!=new Date("01-01-1111")) && (this.dataFinal!=new Date("01-01-1111"))
      && di < df ) {
      for (const reserva of this.getMyRes()) {
       
        const ri = new Date(reserva.checkin);
        //window.alert(ri);
        if (  (ri >= di) && (ri <= df)) {
          v.push(reserva);
          //window.alert(reserva);
        }
      }
    }
    if((this.precoMinimo>=0 ) && (this.dataInicial>=new Date("01-01-1111")) && (this.dataFinal>=new Date("01-01-1111"))
    && di < df ){
          for (const reserva of this.getMyRes()) {
            const ri = new Date(reserva.checkin);
        const rf = new Date(reserva.checkout);
            if ((this.precoMinimo>=0 )  && (this.dataInicial!=new Date("01-01-1111")) && (this.dataFinal!=new Date("01-01-1111"))
            && di < df) {
              
              v.push(reserva);
            }
          }
    }

    return v;
  }

}
