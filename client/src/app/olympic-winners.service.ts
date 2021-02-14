import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class OlympicWinnersService {
  private apiUrl = 'http://localhost:8000/api/athletes';
  private apiSetFilterUrl = 'http://localhost:8000/api/setFilterValues';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }


  getRows(header): Observable<any> {
    return this.http.post<any>(this.apiUrl, header, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched Athletes')),
        catchError(this.handleError<any>('getAthletes',))
      );
  }

  getValues(field): Observable<any> {
    console.log(field)
    return this.http.post<any>(this.apiSetFilterUrl, { field }, this.httpOptions).pipe(
      tap(_ => this.log('fetched set filter values')),
      catchError(this.handleError<any>('getValues', []))
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message)
    this.messageService.add(`HeroService: ${message}`);
  }
}