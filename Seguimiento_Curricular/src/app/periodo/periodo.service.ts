import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periodo } from './periodo.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  private baseURL = 'http://localhost:8080/api/periodos';

  constructor(private httpClient: HttpClient) { }

  getPeriodos(): Observable<Periodo[]> {
    return this.httpClient.get<Periodo[]>(this.baseURL);
  }

  createPeriodo(periodo: Periodo): Observable<Periodo> {
    return this.httpClient.post<Periodo>(this.baseURL, periodo);
  }

  updatePeriodo(id: number, periodo: Periodo): Observable<Periodo> {
    return this.httpClient.put<Periodo>(`${this.baseURL}/${id}`, periodo);
  }

  deletePeriodo(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }
}
