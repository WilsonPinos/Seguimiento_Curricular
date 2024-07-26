import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: Date;
  rol_id: number;
}

export interface Rol {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioEditarService {
  private baseUrl = 'http://localhost:8080/api/usuarios';
  private rolesUrl = 'http://localhost:8080/api/roles';

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  // Obtener un usuario por ID
  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Obtener todos los roles
  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.rolesUrl)
      .pipe(catchError(this.handleError));
  }

  // Actualizar un usuario
  actualizarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Usuario>(`${this.baseUrl}/${usuario.id}`, usuario, { headers })
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de estado: ${error.status}\nMensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
