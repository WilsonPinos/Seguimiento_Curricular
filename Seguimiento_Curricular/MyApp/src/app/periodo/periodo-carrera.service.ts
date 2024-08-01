import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PeriodoCarrera } from './periodo-carrera.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodoCarreraService {
  private baseURL = 'http://localhost:8080/api/periodo_Carreras';

  constructor(private httpClient: HttpClient) { }

  getPeriodoCarreras(): Observable<PeriodoCarrera[]> {
    return this.httpClient.get<PeriodoCarrera[]>(this.baseURL);
  }

  createPeriodoCarrera(periodoCarrera: PeriodoCarrera): Observable<PeriodoCarrera> {
    return this.httpClient.post<PeriodoCarrera>(this.baseURL, periodoCarrera);
  }

  deletePeriodoCarrera(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }
}
