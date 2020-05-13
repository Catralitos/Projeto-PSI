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
  @Input() tipos: string[];
  tipo: string;
  botaoR: boolean;
  confR: boolean;

  @Input() dataInicial: Date;
  @Input() dataFinal: Date;

  constructor(private route: ActivatedRoute,
              private data: DataService,
              private hotelService: HotelService,
              private quartoService: QuartoService,
              private reservaService: ReservaService,
              private location: Location) { }

  ngOnInit(): void {
    this.botaoR = true;
    this.confR = false;
  }

  public addReserva(quarto: Quarto, checkIn: Date, checkOut: Date): void {

    if (!quarto && !checkIn && !checkOut) { return; }

    /*this.reservaService.addReserva({quarto: quarto, checkin: checkIn, checkout: checkOut,
      cliente: this.constroiCliente()}).subscribe(() => this.goBack());*/
  }


  public constroiCliente(nome: string, morada: string, telefone: string, email: string, nif: number,
                         numeroCartao: number, anoValidade: number, mesValidade: number, ccv: number): any {

    nome = nome.trim();
    morada = morada.trim();
    telefone = telefone.trim();
    email = email.trim();

    if (!nome && !morada && !telefone && !email && !nif && !numeroCartao &&
        !anoValidade && !mesValidade && !ccv ) { return; }

    if (!this.validatePhoneNumber(telefone)) {
      return;
    }

    if (!this.validateNif(nif)) {
      return;
    }

    if (!this.validateCreditCard(numeroCartao, anoValidade, mesValidade, ccv)) {
      return;
    }

    const client = {} as Cliente;

    client.nome = nome;
    client.morada = morada;
    client.numero_telefone = telefone;
    client.email = email;
    client.nif = nif;
    client.numeroCartao = numeroCartao;
    client.anoValidade = anoValidade;
    client.mesValidade = mesValidade;
    client.ccv = ccv;

    return client;
  }

  public validatePhoneNumber(telefone: string) {
    const regex = '^\\+(?:[0-9] ?){6,14}[0-9]$';

    if (telefone.match(regex)) {
      return true;
    } else {
      return false;
    }
  }

  public validateNif(nif: number) {
    const regex =  '^[0-9]{6}$';

    if (nif.toString().match(regex)) {
      return true;
    } else {
      return false;
    }
  }

  public validateCreditCard(numero: number, anoValidade: number, mesValidade: number, ccv: number) {
    const regexNumero =  '^[0-9]{16}$';
    const regexAno =  '^[20-99]';
    const regexMes =  '^[1-12]$';
    const regexCcv =  '^[0-9]{3}$';

    if (numero.toString().match(regexNumero) && anoValidade.toString().match(regexAno)
        && mesValidade.toString().match(regexMes) && ccv.toString().match(regexCcv) ) {
      return true;
    } else {
      return false;
    }
  }


  private goBack(): void {
    this.location.back();
  }

  mostraConf(): void {
    this.confR= true;
    this.botaoR=false;
  }



}
