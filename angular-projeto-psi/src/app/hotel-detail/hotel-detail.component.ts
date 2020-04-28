import { Component, OnInit , Input} from '@angular/core';

import { Hotel } from '../interfaces/Hotel';
import { HotelService } from '../hotel.service';
import { Quarto } from '../interfaces/Quarto';
import { QuartoService } from '../quarto.service';
import { Servico } from '../interfaces/Servico';
import { TipoQuarto } from '../interfaces/TipoQuarto';

import { Location } from '@angular/common';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  @Input() hotel: Hotel;
  @Input() quartos: Quarto;
  @Input() servicos: Servico;
  @Input() tipos: TipoQuarto;


  constructor(private route: ActivatedRoute,
              private hotelService: HotelService,
              private quartoService: QuartoService,
              private location: Location) { }

  ngOnInit(): void {
    this.getHotel();
  }

  getHotel(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.hotelService.getHotel(id)
      .subscribe(response => (this.hotel = response.hotel,
        this.quartos = response.quartos, this.servicos = response.servicos,
        this.tipos = response.tipos));
  }

  private goBack(): void {
    this.location.back();
  }

  getCheapestRoom(): void {

  }

  getRoomsFromType(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q;
  }
}
