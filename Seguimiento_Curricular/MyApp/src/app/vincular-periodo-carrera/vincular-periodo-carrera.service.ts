import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VincularPeriodoCarrera } from './vincular-periodo-carrera';

@Injectable({
  providedIn: 'root'
})
export class VincularPeriodoCarreraService {
  private baseURL: string;

  constructor(private httpClient: HttpClient) {
    this.baseURL = this.getBaseUrl();
  }

  private getBaseUrl(): string {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
      return 'http://localhost:8080/api/periodo_Carreras';
    } else {
      return 'http://192.168.0.110:8080/api/periodo_Carreras'; // Reemplaza con la IP adecuada si es necesario
    }
  }

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
