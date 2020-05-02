import { Component, OnInit , Input} from '@angular/core';

import { Quarto } from '../Quarto';
import {QuartoService} from '../quarto.service';
import { TipoQuarto } from '../TipoQuarto';
import { Servico } from '../Servico';

import { DataService } from '../data.service';

import {Location} from '@angular/common';

@Component({
  selector: 'app-room-type-details',
  templateUrl: './room-type-details.component.html',
  styleUrls: ['./room-type-details.component.css']
})
export class RoomTypeDetailsComponent implements OnInit {

  //obter quartos para fazer contagens
  @Input() tipos: TipoQuarto;
  quartos: Quarto[];
  @Input() servicos: Servico[];
  type: TipoQuarto;


  constructor(//private route: ActivatedRoute,
              private data: DataService,
              private quartoService: QuartoService,
              private location: Location) { }

  ngOnInit(): void {
    //this.getQuarto();
    this.data.currentType.subscribe(message => this.type = message);
    this.data.currentRooms.subscribe(message => this.quartos = message)
  }

  /*private getQuarto() { //obter quartos consoante um tipo de quarto
    const id = this.route.snapshot.paramMap.get('id');
    this.quartoService.get
      .subscribe(response => ());
  }*/

  private goBack(): void {
    this.location.back();
  }
}
