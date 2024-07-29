import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario-form/usuario.service';
import { Usuario } from '../usuario-form/usuario.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: Usuario | null = null;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  login(cedula: string, password: string): Observable<boolean> {
    return this.usuarioService.obtenerUsuarioPorCedula(cedula).pipe(
      map((usuario: Usuario | null) => {
        if (usuario && usuario.contrasena === password) {
          this.currentUser = usuario;
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))
    );
  }

  logout() {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return this.currentUser != null;
  }

  get role(): string {
    return this.currentUser && this.currentUser.rol_id !== undefined && this.currentUser.rol_id !== null
      ? this.currentUser.rol_id.toString()
      : '';
  }
}
