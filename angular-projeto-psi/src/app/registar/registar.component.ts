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

  clienteList: Cliente[];
  @Input() cliente: Cliente;
  @Input() tipos: string[];
  tipo: string;
  botaoR: boolean;
  confR: boolean;

  @Input() dataInicial: Date;
  @Input() dataFinal: Date;


  constructor(private location: Location,
              private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientes();
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

    for (let i = 0; i < this.clienteList.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.clienteList[i].email == email) {
        window.alert('Email já existente! Tem que inserir um email diferente!');
        return;
      }
      if (numero_telefone.length > 0 && this.clienteList[i].numero_telefone === numero_telefone) {
        window.alert('Número de telefone já existente! Tem que inserir um número diferente!');
        return;
      }
      if (nif > 0 && this.clienteList[i].nif === nif) {
        window.alert('Nif já existente! Tem que inserir um nif diferente!');
        return;
      }
    }

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
    console.log(morada);
    console.log(numero_telefone);
    console.log(email);
    console.log(nif);

    this.clienteService.addCliente({nome, password, morada, numero_telefone, email, nif}).subscribe(
      () => window.location.replace('/login'));

    window.alert('Registo efetuado com sucesso!');

  }

  public getClientes() {
    this.clienteService.getClientes().subscribe(response => this.clienteList = response.cliente_list);
  }

  public validatePhoneNumber(telefone: string) {
    const regex = '^\\+(?:[0-9] ?){6,14}[0-9]$';
    return telefone.match(regex) && telefone[4].trim() === '';
  }

  public validateNif(nif: number) {
    const regex =  '^[0-9]{9}$';
    return nif.toString().match(regex);
  }

  private goBack(): void {
    this.location.back();
  }

  mostraConf(): void {
    this.confR = true;
    this.botaoR = false;
  }

}
