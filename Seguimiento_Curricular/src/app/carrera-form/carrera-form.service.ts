import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrera } from './carrera.model'; 

@Injectable({
  providedIn: 'root'
})
export class CarreraFormService {
  private baseURL = 'http://localhost:8080/api/carreras'; 

  constructor(private httpClient: HttpClient) { }

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

