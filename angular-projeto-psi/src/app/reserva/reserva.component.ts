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

  hotel: Hotel;
  quartos: Quarto[];
  id: string;
  reservas: Reserva[];


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
    this.getHotel();
    this.getReservasDoHotel();
  }

  public addReserva(): void {

    this.reservaService.addReserva({quarto: this.getRoom(this.tipo), checkin: this.dataInicial,
      checkout: this.dataFinal, nome: this.nome, email: this.email, morada: this.morada,
      numero_telefone: this.telefone, nif: Number(this.nif), numeroCartao: Number(this.numeroCartao),
      ccv: Number(this.ccv), anoValidade: Number(this.ano), mesValidade: Number(this.mes) }).subscribe(() => window.location.reload());
  }


  mostraConf(nome: string, morada: string, telefone: string, email: string, nif: string, numeroCartao: string,
             ano: string, mes: string, ccv: string): void {

    if (!nome || !morada || !telefone || !email || !nif || !numeroCartao ||
      !ano || !mes || !ccv ) {
      window.alert('Existem dados por preencher!');
      return;
    }

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

  public getHotel(): void {
    this.route.params.subscribe((routeParams) => {
      this.id = routeParams.hotelID;
      this.hotelService
        .getHotel(this.id)
        .subscribe(
          (response) => {
            this.hotel = response.hotel;
            this.quartos = response.hotel_rooms;
          }
        );
    });
  }

  public getRoom(type): any {
    const q = this.quartos.filter(quarto => quarto.tipoQuarto === type);

    for (const quarto of q) {
      if (this.reservas.length === 0) {
        return quarto;
      } else {
        for (const reserva of this.reservas) {
          if (this.dataFinal < reserva.checkin
            && this.dataInicial > reserva.checkout) {
            return quarto;
          }
        }
      }
    }
  }

  private getReservasDoHotel(): void {
      this.reservaService.getReservas().subscribe(response => this.reservas = response.reservas_list);
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
