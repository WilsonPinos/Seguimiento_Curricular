import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario-form/usuario.service';
import { Usuario } from '../usuario-form/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cedula: string = '';
  password: string = '';
  error: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  login() {
    this.usuarioService.obtenerListaUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        const usuario = usuarios.find(u => u.cedula === this.cedula && u.contrasena === this.password);
        
        if (usuario) {
          // Redirigir según el rol
          switch (usuario.rol_id) {
            case 1: // ADMIN
              this.router.navigate(['/admin']);
              break;
            case 2: // DIRECTOR
              this.router.navigate(['/director']);
              break;
            case 3: // TUTOR
              this.router.navigate(['/tutor']);
              break;
            default:
              this.error = 'Rol no reconocido';
              break;
          }
        } else {
          this.error = 'Credenciales inválidas';
        }
      },
      error => {
        this.error = 'Error al obtener usuarios';
        console.error(error);
      }
    );
  }
}
