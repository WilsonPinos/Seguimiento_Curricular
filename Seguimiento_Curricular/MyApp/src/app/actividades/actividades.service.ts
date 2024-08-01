import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Actividades } from './actividades';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  
  private baseURL ="http://localhost:8080/api/actividades";
    constructor(private httpClient : HttpClient) { }

    obtenerListaActividades(): Observable<Actividades[]>{
      return this.httpClient.get<Actividades[]>(`${this.baseURL}`);
    }
    crearActividades(actividades: Actividades): Observable<Actividades> {
      return this.httpClient.post<Actividades>(this.baseURL, actividades);
    }
  
    obtenerActividadesId(id: number): Observable<Actividades> {
      return this.httpClient.get<Actividades>(`${this.baseURL}/${id}`);
    }
  
    actualizarActividades(id: number, actividades: Actividades): Observable<Actividades> {
      return this.httpClient.put<Actividades>(`${this.baseURL}/${id}`, actividades);
    }
  
    eliminarActividades(id: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
    }
}
