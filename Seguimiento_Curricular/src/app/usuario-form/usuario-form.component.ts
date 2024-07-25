import { Component } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../usuario-form/usuario.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent {
  usuario: Usuario = { 
    nombre: '', 
    apellido: '', 
    email: '', 
    telefono: '', 
    fecha_nacimiento: new Date(), 
    cedula: '' 
  };

  constructor(private usuarioService: UsuarioService, private datePipe:DatePipe) { }

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
      nombre: '', 
      apellido: '', 
      email: '', 
      telefono: '', 
      fecha_nacimiento: new Date(), 
      cedula: '' 
    };
  }
}
