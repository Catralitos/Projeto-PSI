import {Component, Input, OnInit} from '@angular/core';

import { Hotel } from '../interfaces/Hotel';
import {HotelService} from '../hotel.service';
import { Quarto } from '../interfaces/Quarto';
import {QuartoService} from '../quarto.service';
import { TipoQuarto } from '../interfaces/TipoQuarto';
import { Reserva } from '../interfaces/Reserva';
import {ReservaService} from '../reserva.service';
import { Cliente } from '../interfaces/Cliente';

import { DataService } from '../data.service';

import {Location} from '@angular/common';

import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  hotel: Hotel;
  @Input() cliente: Cliente;
  nome: string;
  morada: string;
  telefone: string;
  email: string;
  nif: string;
  numeroCartao: string;
  ano: string;
  mes: string;
  ccv: string;
  @Input() tipo: string;
  botaoR: boolean;
  confR: boolean;
  inputReserva: boolean;
  confirmacao: boolean;


  @Input() dataInicial: Date;
  @Input() dataFinal: Date;

  constructor(private route: ActivatedRoute,
              private data: DataService,
              private hotelService: HotelService,
              private quartoService: QuartoService,
              private reservaService: ReservaService,
              private location: Location) { }

 myStorage = window.localStorage;

  ngOnInit(): void {
    this.botaoR = true;
    this.confR = false;
    this.inputReserva = true;
    this.confirmacao = false;
  }

  public addReserva(quarto: Quarto, checkIn: Date, checkOut: Date): void {

    if (!quarto && !checkIn && !checkOut) { return; }

    /*this.reservaService.addReserva({quarto: quarto, checkin: checkIn, checkout: checkOut,
      cliente: this.constroiCliente()}).subscribe(() => this.goBack());*/
  }


  mostraConf(nome: string, morada: string, telefone: string, email: string, nif: string, numeroCartao: string,
             ano: string, mes: string, ccv: string): void {

    if (!nome || !morada || !telefone || !email || !nif || !numeroCartao ||
      !ano || !mes || !ccv ) {
      window.alert('Existem dados por preencher!');
      return;
    }
    console.log('numero cartao:' + numeroCartao);
    if (!this.validatePhoneNumber(telefone)) {
      window.alert('Tem que inserir um número de telefone no formato correto. Exemplo: +351 912345678!');
      return;
    }

    if (!this.validateNif(nif)) {
      window.alert('Tem que inserir um nif no formato correto!');
      return;
    }

    if (!this.validateCreditCard(numeroCartao, ano, mes, ccv)) {
      window.alert('Tem que inserir dados de pagamento no formato correto!');
      return;
    }

    this.confR = true;
    this.botaoR = false;
    this.confirmacao = true;
    this.inputReserva = false;

    this.nome = nome;
    this.morada = morada;
    this.email = email;
    this.telefone = telefone;
    this.nif = nif;
    this.numeroCartao = numeroCartao;
    this.ano = ano;
    this.mes = mes;
    this.ccv = ccv;
  }



  public validatePhoneNumber(telefone: string) {
    const regex = '^\\+(?:[0-9] ?){6,14}[0-9]$';

    if (telefone.match(regex)) {
      return true;
    } else {
      return false;
    }
  }

  public validateNif(nif: string) {
    const regex =  '^[0-9]{9}$';

    if (nif.match(regex)) {
      return true;
    } else {
      return false;
    }
  }

  public validateCreditCard(numero: string, anoValidade: string, mesValidade: string, ccv: string) {
    const regexNumero =  '^[0-9]{16}$';
    const regexAno =  '[2-9][0-9]$';
    const regexMes =  '0[1-9]|1[0-2]$';
    const regexCcv =  '^[0-9]{3}$';

    if (numero.match(regexNumero) && anoValidade.match(regexAno)
        && mesValidade.match(regexMes) && ccv.match(regexCcv) ) {
      return true;
    } else {
      return false;
    }
  }



  private goBack(): void {
    this.location.back();
  }


}
