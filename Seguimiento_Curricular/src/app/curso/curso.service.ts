import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private baseURL = 'http://localhost:8080/api/curso';

  constructor(private httpClient: HttpClient) { }

  obtenerListaCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(`${this.baseURL}`);
  }

   //Métodos para editar y borrar cursos pueden ser agregados aquí
   editarCurso(curso: Curso): Observable<Object> {
     return this.httpClient.put(`${this.baseURL}/${curso.curso_id}`, curso);
  }

   borrarCurso(curso_id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${curso_id}`);
   }
}
