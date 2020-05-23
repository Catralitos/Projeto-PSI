import { Component, OnInit } from '@angular/core';

import { Reserva } from '../interfaces/Reserva';
import {ReservaService} from '../reserva.service';
import { Cliente } from '../interfaces/Cliente';

import {Hotel} from '../interfaces/Hotel';
import {HotelService} from '../hotel.service';
import {Quarto} from '../interfaces/Quarto';
import {QuartoService} from '../quarto.service';

@Component({
  selector: 'app-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.css']
})
export class UserAreaComponent implements OnInit {

  reservas: Reserva[];
  cliente: Cliente;
  quarto: Quarto;
  hotel: Hotel;
  myStorage = window.localStorage;
  constructor(private reservaService: ReservaService,
              private hotelService: HotelService,
              private quartoService: QuartoService) { }

  ngOnInit(): void {
    //this.getCliente();
    this.getReservas();
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

}
