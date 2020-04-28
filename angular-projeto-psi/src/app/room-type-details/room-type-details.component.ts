import { Component, OnInit , Input} from '@angular/core';

import { Quarto } from '../interfaces/Quarto';
import {QuartoService} from "../quarto.service";
import { TipoQuarto } from '../interfaces/TipoQuarto';
import { Servico } from '../interfaces/Servico';


import {Location} from "@angular/common";

@Component({
  selector: 'app-room-type-details',
  templateUrl: './room-type-details.component.html',
  styleUrls: ['./room-type-details.component.css']
})
export class RoomTypeDetailsComponent implements OnInit {

  //obter quartos para fazer contagens
  @Input() tipos: TipoQuarto;
  @Input() servicos: Servico;


  constructor(private route: ActivatedRoute,
              private quartoService: QuartoService,
              private location: Location) { }

  ngOnInit(): void {
    this.getQuarto();
  }

  private getQuarto() { //obter quartos consoante um tipo de quarto
    const id = this.route.snapshot.paramMap.get('id');
    this.quartoService.get
      .subscribe(response => ());
  }

  private goBack(): void {
    this.location.back();
  }
}
