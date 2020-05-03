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
  private messageSource = new BehaviorSubject<string>('');
  currentId = this.messageSource.asObservable();


  constructor() { }

  changeHotelId(id: string) {
    this.messageSource.next(id);
  }
}
