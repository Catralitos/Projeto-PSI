export interface Cliente {
  _id: string;
  nome: string;
  password: string;
  morada: string;
  numero_telefone: string;
  email: string;
  nif: number;
  numeroCartao: number;
  ccv: number;
  anoValidade: number;
  mesValidade: number;
}
