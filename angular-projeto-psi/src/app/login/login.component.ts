import {Component, OnInit} from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Cliente} from '../interfaces/Cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  clienteList: Cliente[];
  myStorage = window.localStorage;

  constructor(private route: ActivatedRoute, private clienteService: ClienteService, private location: Location) { }

  ngOnInit(): void {
    this.getClientes();
  }

  loginCliente(email: string, password: string) {
    for (const cliente of this.clienteList) {
      if (cliente.email === email && password === cliente.password) {
        this.myStorage.setItem('nome',  cliente.nome);
        this.myStorage.setItem('morada',  cliente.morada);
        this.myStorage.setItem('numero_telefone',  cliente.numero_telefone);
        this.myStorage.setItem('email',  cliente.email);
        this.myStorage.setItem('nif', String(cliente.nif));
        this.goBack();
      }
    }
    window.alert('Login sem sucesso');
  }

  goBack(): void {
    this.location.back();
  }

  private getClientes() {
    this.clienteService.getClientes().subscribe(response => this.clienteList = response.cliente_list);
  }

}
