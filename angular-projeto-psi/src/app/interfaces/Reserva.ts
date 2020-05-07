import {Quarto} from './Quarto';
import {Cliente} from './Cliente';

export interface Reserva {
  id: string;
  quarto: Quarto;
  checkin: Date;
  checkout: Date;
  cliente: Cliente;
}
