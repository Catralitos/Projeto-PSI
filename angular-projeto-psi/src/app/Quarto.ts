import {Hotel} from './Hotel';
import {TipoQuarto} from './TipoQuarto';
import {Servico} from './Servico';
export interface Quarto {
  id: string;
  hotel: Hotel;
  tipoQuarto: TipoQuarto;
  precoBaixo: number;
  precoAlto: number;
  servicos: Servico[];
}
