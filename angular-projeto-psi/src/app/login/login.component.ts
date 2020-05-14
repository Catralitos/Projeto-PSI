import { Component, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/Cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  clientes: Cliente[];
  cliente: Cliente;

  constructor(private clienteService: ClienteService,) { }

  ngOnInit(): void {
  }

  getClientes(): void {
    this.clienteService.getClientes().subscribe(clientes => this.clientes = clientes.cliente_list);
  }

  loginCliente(email: string, password: string){
    this.clienteService.getCliente(email).subscribe(response => (this.cliente = response.cliente));
    console.log(this.cliente);
    console.log(email);
    console.log(password);
    if(!this.cliente || email == null){
      window.alert("Tem que inserir um email existente!");
      this.cliente = null;
      return;
    }
    if(this.cliente.password != password || password == null){
      window.alert("Password inválida! Tem que inserir a password correta!");
      this.cliente = null;
      return;
    }
    window.alert("Cliente autenticado com sucesso!");
  }

}
