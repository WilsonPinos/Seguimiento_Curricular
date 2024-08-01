import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = this.getBaseUrl();
  }

  private getBaseUrl(): string {
    const hostname = window.location.hostname;
    if (hostname === 'localhost') {
      return 'http://localhost:8080/api/cursos';
    } else {
      // Asume que la IP de tu PC en la red local es 192.168.0.110
      return 'http://192.168.23.248:8080/api/cursos';
    }
  }

  obtenerListaCurso(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(`${this.baseUrl}`);
  }

  crearCurso(curso: Curso): Observable<Curso> {
    return this.httpClient.post<Curso>(this.baseUrl, curso);
  }

  obtenerCursoId(id: number): Observable<Curso> {
    return this.httpClient.get<Curso>(`${this.baseUrl}/${id}`);
  }

  actualizarCurso(id: number, curso: Curso): Observable<Curso> {
    return this.httpClient.put<Curso>(`${this.baseUrl}/${id}`, curso);
  }

  eliminarCurso(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
