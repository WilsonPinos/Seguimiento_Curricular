import { Component, OnInit } from '@angular/core';
import { CarreraFormService } from './carrera-form.service'; 
import { UsuarioService } from '../usuario-form/usuario.service';
import { Carrera } from './carrera.model'; 
import { Usuario } from '../usuario-form/usuario.model';
import Swal from 'sweetalert2';
import { Location } from '@angular/common'; // Importa Location para navegar hacia atrás

@Component({
  selector: 'app-carrera-form',
  templateUrl: './carrera-form.component.html',
  styleUrls: ['./carrera-form.component.css']
})
export class CarreraFormComponent implements OnInit {
  carreras: Carrera[] = [];
  carrera: Carrera = { id: 0, nombre: '', descripcion: '', usuario_id: 0 }; 
  selectedCarrera: Carrera | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;
  usuarios: Usuario[] = []; // Lista de usuarios
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private carreraService: CarreraFormService,
    private usuarioService: UsuarioService,
    private location: Location // Inyecta Location para navegar hacia atrás
  ) { }

  ngOnInit(): void {
    this.obtenerCarreras();
    this.obtenerUsuariosDirectores(); // Cambiado para obtener solo directores
  }

  obtenerCarreras(): void {
    this.isLoading = true;
    this.carreraService.obtenerListaCarreras().subscribe(
      data => {
        this.carreras = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error al obtener carreras:', error);
        this.errorMessage = 'Error al obtener la lista de carreras.';
        this.isLoading = false;
      }
    );
  }

  obtenerUsuariosDirectores(): void {
    this.usuarioService.obtenerUsuariosDirectores().subscribe(
      data => this.usuarios = data,
      error => {
        console.error('Error al obtener usuarios directores:', error);
        this.errorMessage = 'Error al obtener la lista de usuarios directores.';
      }
    );
  }
  isFormValid(): boolean {
    return this.carrera.nombre.trim().length > 0 && this.carrera.usuario_id > 0;
  }

  onSubmit(): void {
    this.isLoading = true;
    if (!this.isEditing) {
      this.carreraService.crearCarrera(this.carrera).subscribe(
        data => {
          this.carreras.push(data);
          this.resetForm();
          this.isLoading = false;
          // Muestra la alerta de éxito
          Swal.fire({
            title: 'Éxito',
            text: 'Carrera creada',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error => {
          console.error('Error al guardar carrera:', error);
          this.errorMessage = 'Error al guardar la carrera.';
          this.isLoading = false;
        }
      );
    } else {
      this.carreraService.actualizarCarrera(this.editingId!, this.carrera).subscribe(
        data => {
          const index = this.carreras.findIndex(c => c.id === this.editingId);
          if (index !== -1) {
            this.carreras[index] = data;
          }
          this.resetForm();
          this.isLoading = false;
          // Muestra la alerta de éxito al actualizar
          Swal.fire({
            title: 'Éxito',
            text: 'Carrera actualizada',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error => {
          console.error('Error al actualizar carrera:', error);
          this.errorMessage = 'Error al actualizar la carrera.';
          this.isLoading = false;
        }
      );
    }
  }

  onUpdate(): void {
    this.onSubmit();
  }

  onCancelEdit(): void {
    this.resetForm();
  }

  selectCarrera(carrera: Carrera): void {
    this.selectedCarrera = carrera;
  }

  onEdit(carrera: Carrera): void {
    this.carreraService.obtenerCarreraPorId(carrera.id).subscribe(
      data => {
        this.carrera = { ...data };
        this.isEditing = true;
        this.editingId = carrera.id;
      },
      error => {
        console.error('Error al obtener carrera para editar:', error);
        this.errorMessage = 'Error al obtener la carrera para editar.';
      }
    );
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta carrera?')) {
      this.isLoading = true;
      this.carreraService.eliminarCarrera(id).subscribe(
        () => {
          this.carreras = this.carreras.filter(c => c.id !== id);
          this.selectedCarrera = null;
          this.isLoading = false;
        },
        error => {
          console.error('Error al eliminar carrera:', error);
          this.errorMessage = 'Error al eliminar la carrera.';
          this.isLoading = false;
        }
      );
    }
  }

  getDirectorName(usuario_id: number): string {
    const usuario = this.usuarios.find(u => u.id === usuario_id);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido';
  }

  private resetForm(): void {
    this.carrera = { id: 0, nombre: '', descripcion: '', usuario_id: 0 };
    this.isEditing = false;
    this.editingId = null;
    this.selectedCarrera = null;
    this.errorMessage = '';
  }

  goBack(): void {
    this.location.back();
  }
}
