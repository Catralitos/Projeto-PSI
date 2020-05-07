import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private reservasUrl = 'http://appserver.alunos.di.fc.ul.pt:3010/catalog/reservas';  // URL to web api
  private reservaUrl = 'http://appserver.alunos.di.fc.ul.pt:3010/catalog/reserva';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET reservas from the server */
  getReservas(): Observable<any> {
    return this.http.get<any>(this.reservasUrl)
      .pipe(
        map(res => res),
        tap(_ => this.log('fetch reservas request sent')),
        catchError(this.handleError<any>('getReserva', []))
      );
  }

  /** GET reserva by id. Return `undefined` when id not found */
  getReservaNo404<Data>(id: string): Observable<any> {
    const url = `${this.reservaUrl}/?id=${id}`;
    return this.http.get<any>(url)
      .pipe(
        map(reservas => reservas[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} reserva id=${id}`);
        }),
        catchError(this.handleError<any>(`getReserva id=${id}`))
      );
  }

  /** GET reserva by id. Will 404 if id not found */
  getReserva(id: string): Observable<any> {
    const url = `${this.reservaUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetch reserva w/ id=${id} request sent`)),
      catchError(this.handleError<any>(`getReserva id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BookService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ReservaService: ${message}`);
  }
}