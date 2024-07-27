import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VincularPeriodoCarrera } from './vincular-periodo-carrera';

@Injectable({
  providedIn: 'root'
})
export class VincularPeriodoCarreraService {
private baseURL = 'http://localhost:8080/api/periodo_Carreras';

  constructor(private httpClient: HttpClient) { }

  obtenerListaPeriodo_carreras(): Observable<VincularPeriodoCarrera[]> {
    return this.httpClient.get<VincularPeriodoCarrera[]>(`${this.baseURL}`);
  }

  crearPeriodoCarrera(periodo_carreras: VincularPeriodoCarrera): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, periodo_carreras);
  }

  actualizarPeriodoCarrera(periodo_carreras: VincularPeriodoCarrera): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${periodo_carreras.id}`, periodo_carreras);
  }

  eliminarPeriodoCarrera(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
