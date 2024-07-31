import { Component } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../usuario-form/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent {
  usuario: Usuario = {
    id: undefined,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fecha_nacimiento: new Date(),
    cedula: '',
    rol_id: undefined,
    contrasena: '' // Inicializa el nuevo campo
  };

  constructor(private usuarioService: UsuarioService,
    private router: Router
  ) { }

  guardarUsuario(): void {
    const { rol_id, ...usuarioToSave } = this.usuario;
    console.log('Datos del usuario antes de enviar:', usuarioToSave);

    this.usuarioService.guardarUsuario(usuarioToSave).subscribe(
      data => {
        console.log('Usuario guardado:', data);
        Swal.fire({
          title: 'Éxito',
          text: 'Usuario creado exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.resetForm();
          this.router.navigate(['/login']);
        });
      },
      error => {
        console.error('Error al guardar usuario:', error);
      }
    );
  }

  private resetForm(): void {
    this.usuario = {
      id: undefined,
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      fecha_nacimiento: new Date(),
      cedula: '',
      rol_id: undefined,
      contrasena: ''
    };
  }
}
