import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8080/api/usuarios'; // Asegúrate de que esta URL sea correcta
  private rolesUrl = 'http://localhost:8080/api/roles'; // URL para el servicio de roles

  constructor(private http: HttpClient) { }

  // Guardar un nuevo usuario
  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    // Verifica el rol y obtiene el rol_id
    return this.obtenerRolIdPorNombre('DOCENTE').pipe(
      switchMap(rolId => {
        usuario.rol_id = rolId;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Usuario>(this.baseUrl, usuario, { headers });
      }),
      catchError(this.handleError)
    );
  }
  

  // Obtener el rol_id por nombre
  private obtenerRolIdPorNombre(nombre: string): Observable<number> {
    return this.http.get<any[]>(this.rolesUrl).pipe(
      switchMap(roles => {
        const rol = roles.find(r => r.nombre === nombre);
        return of(rol ? rol.id : 0); // Devuelve el id del rol o 0 si no se encuentra
      }),
      catchError(this.handleError)
    );
  }
  obtenerListaUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }
  obtenerIdRolDirector(): Observable<number> {
    return this.http.get<number>(this.baseUrl);
  }

 

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de estado: ${error.status}\nMensaje: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  
  // Obtener usuarios por rol_id
  private obtenerUsuariosPorRol(rolId: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}?rolId=${rolId}`).pipe(
      catchError(this.handleError)
    );
  }
  
  // Obtener usuarios que tienen el rol de "DIRECTOR"
  obtenerUsuariosDirectores(): Observable<Usuario[]> {
    return this.obtenerRolIdPorNombre('DIRECTOR').pipe(
      switchMap(rolId => {
        // Obtener todos los usuarios y filtrar por rol_id
        return this.http.get<Usuario[]>(this.baseUrl).pipe(
          switchMap(usuarios => {
            const directores = usuarios.filter(u => u.rol_id === rolId);
            return of(directores);
          }),
          catchError(this.handleError)
        );
      }),
      catchError(this.handleError)
    );
  }
}
