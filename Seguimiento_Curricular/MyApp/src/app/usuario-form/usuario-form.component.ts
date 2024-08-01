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
    contrasena: ''
  };

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  guardarUsuario(): void {
    if (!this.isFormComplete()) {
      this.showAlert('Por favor, complete todos los campos correctamente.');
      return;
    }

    const errores = this.validateFields();
    if (errores.length > 0) {
      this.showAlert(`Errores encontrados:\n${errores.join('\n')}`);
      return;
    }

    // Si no hay errores, guardar usuario
    this.usuarioService.guardarUsuario(this.usuario).subscribe(
      data => {
        Swal.fire({
          title: 'Éxito',
          text: 'Usuario registrado exitosamente',
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

  isFormComplete(): boolean {
    return this.usuario.nombre.trim() !== '' &&
           this.usuario.apellido.trim() !== '' &&
           this.usuario.telefono.trim() !== '' &&
           this.usuario.cedula.trim() !== '' &&
           this.usuario.email.trim() !== '' &&
           this.usuario.contrasena.trim() !== '';
  }

  validateFields(): string[] {
    const errores: string[] = [];
    if (!/^[0-9]+$/.test(this.usuario.cedula)) {
      errores.push('Cédula solo debe contener números.');
    }

    if (!/^[a-zA-Z]+$/.test(this.usuario.nombre)) {
      errores.push('Nombre solo debe contener letras.');
    }
    if (!/^[a-zA-Z]+$/.test(this.usuario.apellido)) {
      errores.push('Apellido solo debe contener letras.');
    }
    if (!/^[0-9]+$/.test(this.usuario.telefono)) {
      errores.push('Teléfono solo debe contener números.');
    }
    

    return errores;
  }

  private showAlert(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
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
