import {Component, OnInit} from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myStorage = window.localStorage;

  constructor(private route: ActivatedRoute, private clienteService: ClienteService, private location: Location) { }

  ngOnInit(): void {
  }

  loginCliente(email: string, password: string) {
    this.clienteService.getCliente(email).subscribe(response => {
      console.log('Ele leu o email como: ' + email);
      console.log('Ele leu a pass como: ' + password);
      console.log('Ele leu resposta como: ' + response);
      console.log('Ele leu a password da resposta como: ' + response.cliente.password);
      /*if (email == null || email.length < 1) {
        window.alert('Tem que inserir um email');
        return;
      }
      if (password == null || password.length < 1 || response.cliente.password !== password) {
        window.alert('Password inválida! Tem que inserir a password correta!');
        return;
      }*/
      this.myStorage.setItem('nome',  response.cliente.nome);
      this.myStorage.setItem('morada',  response.cliente.morada);
      this.myStorage.setItem('numero_telefone',  response.cliente.numero_telefone);
      this.myStorage.setItem('email',  response.cliente.email);
      this.myStorage.setItem('nif', String(response.cliente.nif));
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
