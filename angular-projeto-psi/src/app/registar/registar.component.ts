import { Component, Input, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../interfaces/Cliente';

import { DataService } from '../data.service';

import {Location} from '@angular/common';

import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-registar',
  templateUrl: './registar.component.html',
  styleUrls: ['./registar.component.css']
})
export class RegistarComponent implements OnInit {

  @Input() cliente: Cliente;
  nome: string;
  password: string;
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


  constructor(private location: Location,
              private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.botaoR = true;
    this.confR = false;
  }

  registarCliente(nomeCliente: string, passwordCliente: string, moradaCliente: string, telefone: string,
                  emailCliente: string, nif: number, ): any {
    const nome = nomeCliente.trim();
    const password = passwordCliente.trim();
    const morada = moradaCliente.trim();
    // tslint:disable-next-line:variable-name
    const numero_telefone = telefone.trim();
    const email = emailCliente.trim();

    console.log(nome.length);
    console.log(password.length);
    console.log(email.length);

    if (nome.length === 0 || password.length === 0 || email.length === 0) {
      window.alert('Tem que inserir um nome/password/email!');
      return;
    }

    if (numero_telefone) {
      if (!this.validatePhoneNumber(numero_telefone)) {
        window.alert('Tem que inserir um número de telefone no formato correto!');
        return;
      }
    }

    if (nif > 0) {
      if (!this.validateNif(nif)) {
        window.alert('Tem que inserir um nif no formato correto!');
        return;
      }
    }

    console.log(nome);
    console.log(password);
    console.log(morada === '');
    console.log(numero_telefone === '');
    console.log(email);
    console.log(nif === null);

    this.clienteService.addCliente({nome, password, morada, numero_telefone, email, nif}).subscribe(() => this.goBack());

    window.alert('Registo efetuado com sucesso!');

  }

  public validatePhoneNumber(telefone: string) {
    const regex = '^\\+(?:[0-9] ?){6,14}[0-9]$';
    return !!telefone.match(regex);
  }

  public validateNif(nif: number) {
    const regex =  '^[0-9]{6}$';
    return !!nif.toString().match(regex);
  }

  private goBack(): void {
    this.location.back();
  }

  mostraConf(): void {
    this.confR = true;
    this.botaoR = false;
  }

}
