import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario-form/usuario.service';
import { Usuario } from '../usuario-form/usuario.model';
import { GlobalState } from './GlobalState';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cedula: string = '';
  password: string = '';
  error: string = '';

  // Definir el usuario de administrador
  private adminUser: Usuario = {
    id: 1,
    nombre: 'Admin',
    apellido: 'User',
    email: 'admin@example.com',
    telefono: '1234567890',
    fecha_nacimiento: new Date('1970-01-01'),
    cedula: 'admin123',
    contrasena: 'adminpassword',
    rol_id: 1
  };

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  login() {
    this.usuarioService.obtenerListaUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        // Añadir el usuario de administrador a la lista de usuarios
        usuarios.push(this.adminUser);

        const usuario = usuarios.find(u => u.cedula === this.cedula && u.contrasena === this.password);
        
        if (usuario) {
          // Redirigir según el rol
          GlobalState.cedula = usuario.cedula;
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
