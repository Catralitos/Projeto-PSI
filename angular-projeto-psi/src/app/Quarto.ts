import {Hotel} from './Hotel';
import {TipoQuarto} from './TipoQuarto';
export interface Quarto {
  id: string;
  hotel: Hotel;
  tipoQuarto: TipoQuarto;
  precoBaixo: number;
  precoAlto: number;
  servicos: string[];
}
