
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Curso } from './curso';


@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private baseUrl = "http://localhost:8080/api/cursos"



  constructor(private httpClient: HttpClient) { }

  obtenerListaCurso(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(`${this.baseUrl}`);

  }

  crearCurso(curso: Curso): Observable<Curso> {
    return this.httpClient.post<Curso>(this.baseUrl, curso);
  }

  obtenerCursoId(id: number): Observable<Curso> {
    return this.httpClient.get<Curso>(`${this.baseUrl}/${id}`);
  }

  actualizarcurso(id: number, curso: Curso): Observable<Curso> {
    return this.httpClient.put<Curso>(`${this.baseUrl}/${id}`, curso);
  }

  eliminarcurso(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }




}
