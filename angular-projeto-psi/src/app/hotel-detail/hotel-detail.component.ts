import { Component, OnInit , Input} from '@angular/core';

import { Hotel } from '../Hotel';
import { HotelService } from '../hotel.service';
import { Quarto } from '../Quarto';
import { QuartoService } from '../quarto.service';
import { Servico } from '../Servico';
import { TipoQuarto } from '../TipoQuarto';

import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import { DataService } from '../data.service';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css'],
  template: '<room-type-details [message]="message"></room-type-details>',
  //template: '<room-type-details></room-type-details>',
})
export class HotelDetailComponent implements OnInit {

  @Input() hotel: Hotel;
  @Input() quartos: Quarto[];
  @Input() servicos: Servico[];
  tipos: TipoQuarto[];
  message = 'heloo';



  constructor(private route: ActivatedRoute,
              private data: DataService,
              private hotelService: HotelService,
              private quartoService: QuartoService,
              private location: Location) { }

  ngOnInit(): void {
    this.getHotel();
    //this.data.currentMessage.subscribe(message => this.message = message);
    this.newInfo();
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

  getCheapestRoom(): void {

  }

  length(): any {
    return 1;
  }

  private getRoomTypes(): any {
    this.quartos.forEach(function(quarto) {
      if (!this.tipos.includes(quarto.tipoQuarto)) {
        this.tipos.push(quarto.tipoQuarto);
      }
    });
  }

  private getRoom(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q;
  }
  /* codigo de html
  <li *ngFor="let tipo of quartos">
      <h3>Tipo de quarto: {{tipo}} </h3>
      <h3>Numero de quartos :numeroQuartos(tipo)</h3>
      <h3>Serviços Disponiveis:</h3>
        <ul class="servicos">
          <li *ngFor="let servico of servicos">
            <span class="badge">{{servico.nome}}</span>
          </li>
        </ul>
  </li>
   */
}
