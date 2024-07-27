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
    cedula: '',
    rol_id: undefined,
    contrasena: '' // Inicializa el nuevo campo
  };

  constructor(private usuarioService: UsuarioService) { }

  guardarUsuario(): void {
    const { rol_id, ...usuarioToSave } = this.usuario;
    console.log('Datos del usuario antes de enviar:', usuarioToSave);

    this.usuarioService.guardarUsuario(usuarioToSave).subscribe(
      data => {
        console.log('Usuario guardado:', data);
        this.resetForm();
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
