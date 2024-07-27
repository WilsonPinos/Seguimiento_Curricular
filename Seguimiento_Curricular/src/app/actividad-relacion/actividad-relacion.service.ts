import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActividadRelacion } from './actividad-relacion';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ActividadRelacionService {
  private baseURL ="http://localhost:8080/api/actividad_relacion";
  constructor(private httpClient : HttpClient) { }
  obtenerListaActividadesRelacion(): Observable<ActividadRelacion[]>{
    return this.httpClient.get<ActividadRelacion[]>(`${this.baseURL}`);
  }
  crearActividadesRelacion(actividades: ActividadRelacion): Observable<ActividadRelacion> {
    return this.httpClient.post<ActividadRelacion>(this.baseURL, actividades);
  }

  obtenerActividadesRelacionId(id: number): Observable<ActividadRelacion> {
    return this.httpClient.get<ActividadRelacion>(`${this.baseURL}/${id}`);
  }
  actualizarActividadesRelacion(id: number, actividades: ActividadRelacion): Observable<ActividadRelacion> {
    return this.httpClient.put<ActividadRelacion>(`${this.baseURL}/${id}`, actividades);
  }

  eliminarActividadesRelacion(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  actualizarActividadRelacion(relacion: ActividadRelacion): Observable<Object> {
    return this.httpClient.put(`${this.baseURL}/${relacion.id}`, relacion);
  }
}
