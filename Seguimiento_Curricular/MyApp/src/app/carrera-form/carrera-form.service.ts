import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrera } from './carrera.model'; 

@Injectable({
  providedIn: 'root'
})
export class CarreraFormService {
  private baseURL: string;

  constructor(private httpClient: HttpClient) {
    this.baseURL = this.getBaseURL();
  }

  private getBaseURL(): string {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
      return 'http://localhost:8080/api/carreras';
    } else {
      return 'http://192.168.0.110:8080/api/carreras';
    }
  }

  obtenerListaCarreras(): Observable<Carrera[]> {
    return this.httpClient.get<Carrera[]>(this.baseURL);
  }

  crearCarrera(carrera: Carrera): Observable<Carrera> {
    return this.httpClient.post<Carrera>(this.baseURL, carrera);
  }

  obtenerCarreraPorId(id: number): Observable<Carrera> {
    return this.httpClient.get<Carrera>(`${this.baseURL}/${id}`);
  }

  actualizarCarrera(id: number, carrera: Carrera): Observable<Carrera> {
    return this.httpClient.put<Carrera>(`${this.baseURL}/${id}`, carrera);
  }

  eliminarCarrera(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }
}
