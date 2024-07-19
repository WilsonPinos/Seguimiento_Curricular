import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Periodo } from './periodo.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {
  /*
  private baseUrl = 'http://localhost:8080/api/periodo'; // URL de tu backend

  constructor(private http: HttpClient) { }

  getPeriodos(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(`${this.baseUrl}`);
  }

  createPeriodo(periodo: Periodo): Observable<Periodo> {
    return this.http.post<Periodo>(`${this.baseUrl}`, periodo);
  }

  updatePeriodo(id: number, periodo: Periodo): Observable<Periodo> {
    return this.http.put<Periodo>(`${this.baseUrl}/${id}`, periodo);
  }

  deletePeriodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
    */
}
