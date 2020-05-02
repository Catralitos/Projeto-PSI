import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { Hotel } from './Hotel';
import { Quarto } from './Quarto';
import { TipoQuarto } from './TipoQuarto';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  //type
  private typeSource = new BehaviorSubject<TipoQuarto>(null);
  currentType = this.typeSource.asObservable();

  //quartos
  private quartoSource = new BehaviorSubject<Quarto[]>(null);
  currentRooms = this.quartoSource.asObservable();

  constructor() { }

  changeType(type: TipoQuarto) {
    this.typeSource.next(type);
  }

  changeRooms(quartos: Quarto[]) {
    this.quartoSource.next(quartos);
  }
}
