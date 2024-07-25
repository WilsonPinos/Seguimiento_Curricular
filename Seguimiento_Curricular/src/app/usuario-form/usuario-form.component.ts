import { Component } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../usuario-form/usuario.model';

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
    cedula: ''
  };

  constructor(private usuarioService: UsuarioService) { }

  guardarUsuario(): void {
    console.log('Datos del usuario antes de enviar:', this.usuario);

    this.usuarioService.guardarUsuario(this.usuario).subscribe(
      data => {
        console.log('Usuario guardado:', data);
        this.resetForm(); // Limpiar el formulario después de guardar
      },
      error => console.error('Error al guardar usuario:', error)
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
      cedula: ''
    };
  }
}
