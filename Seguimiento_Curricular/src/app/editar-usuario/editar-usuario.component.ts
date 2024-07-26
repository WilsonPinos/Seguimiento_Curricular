import { Component, OnInit } from '@angular/core';
import { UsuarioEditarService, Usuario, Rol } from './usuario-editar.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  roles: Rol[] = [];
  usuarioSeleccionado: Usuario | null = null;

  constructor(private usuarioService: UsuarioEditarService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerRoles();
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(
      data => this.usuarios = data,
      error => console.error('Error al obtener usuarios:', error)
    );
  }

  obtenerRoles(): void {
    this.usuarioService.obtenerRoles().subscribe(
      data => this.roles = data,
      error => console.error('Error al obtener roles:', error)
    );
  }

  seleccionarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario };
  }

  guardarUsuario(): void {
    if (this.usuarioSeleccionado) {
      console.log('Guardando usuario con rolId:', this.usuarioSeleccionado.rol_id); // Verifica que el rolId esté presente
      this.usuarioService.actualizarUsuario(this.usuarioSeleccionado).subscribe(
        data => {
          console.log('Usuario actualizado:', data);
          const index = this.usuarios.findIndex(u => u.id === data.id);
          if (index !== -1) {
            this.usuarios[index] = data;
          }
          this.usuarioSeleccionado = null;
        },
        error => console.error('Error al actualizar usuario:', error)
      );
    }
  }

  cambiarRol(event: Event): void {
    if (this.usuarioSeleccionado) {
      const target = event.target as HTMLSelectElement;
      this.usuarioSeleccionado.rol_id = +target.value; // Convierte el valor a número
      console.log(`Rol cambiado para usuario ${this.usuarioSeleccionado.nombre}: ${this.usuarioSeleccionado.rol_id}`);
    }
  }

  cancelarEdicion(): void {
    this.usuarioSeleccionado = null;
  }
}
