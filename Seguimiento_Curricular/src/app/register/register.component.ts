import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../usuario-form/auth.service';
import { Usuario } from '../usuario-form/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  usuario: Usuario = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha_nacimiento: new Date(),
    cedula: '',
    rol_id: 2 // Asignando el rol de docente por defecto
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(): void {
    console.log('Datos de registro:', this.usuario); // Verificar los datos enviados

    this.authService.register(this.usuario).subscribe(
      response => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']); // Redirige al login tras el registro exitoso
      },
      error => {
        console.error('Registro fallido', error);
      }
    );
  }
}
