import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from './roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private baseURL: string;

  constructor(private httpClient: HttpClient) {
    this.baseURL = this.getBaseUrl();
  }

  private getBaseUrl(): string {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
      return 'http://localhost:8080/api/roles';
    } else {
      return 'http://192.168.23.248:8080/api/roles'; // Reemplaza con la IP adecuada si es necesario
    }
  }

  obtenerListaRoles(): Observable<Roles[]> {
    return this.httpClient.get<Roles[]>(`${this.baseURL}`);
  }

  crearRoles(roles: Roles): Observable<Roles> {
    return this.httpClient.post<Roles>(this.baseURL, roles);
  }

  obtenerRolesId(id: number): Observable<Roles> {
    return this.httpClient.get<Roles>(`${this.baseURL}/${id}`);
  }

  actualizarRoles(id: number, roles: Roles): Observable<Roles> {
    return this.httpClient.put<Roles>(`${this.baseURL}/${id}`, roles);
  }

  eliminarRoles(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }
}
