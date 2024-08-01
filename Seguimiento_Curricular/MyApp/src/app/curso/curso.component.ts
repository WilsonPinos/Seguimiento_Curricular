import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CursoService } from './curso.service';
import { Curso } from './curso';
import Swal from 'sweetalert2';
import { Usuario } from '../usuario-form/usuario.model';
import { UsuarioService } from '../usuario-form/usuario.service';
import { Carrera } from '../carrera-form/carrera.model';
import { CarreraFormService } from '../carrera-form/carrera-form.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursosComponent implements OnInit {
  @ViewChild('cursoForm', { static: false }) cursoForm: NgForm;

  cursos: Curso[] = [];
  curso: Curso = { id: 0, nombre: '', descripcion: '', usuario_id: 0, carrera_id: 0 };
  selectedCurso: Curso | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;

  usuarios: Usuario[] = [];
  carreras: Carrera[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private carreraService: CarreraFormService
  ) {}

  ngOnInit(): void {
    this.obtenerCurso();
    this.obtenerCarreras();
    this.obtenerUsuariosTutores();
  }

  obtenerCurso(): void {
    this.cursoService.obtenerListaCurso().subscribe(
      data => {
        this.cursos = data;
      },
      error => {
        console.error("Error al recuperar cursos", error);
      }
    );
  }

  obtenerUsuariosTutores(): void {
    this.usuarioService.obtenerUsuariostutores().subscribe(
      data => this.usuarios = data,
      error => {
        console.error('Error al obtener usuarios tutores', error);
        this.errorMessage = 'Error al obtener la lista de usuarios tutores';
      }
    );
  }

  validarCampos(): boolean {
    const nombreValido = this.curso.nombre.trim().length >= 3 && this.curso.nombre.trim().length <= 50;
    const descripcionValida = this.curso.descripcion.trim().length >= 5 && this.curso.descripcion.trim().length <= 200;
    
    if (!nombreValido) {
      Swal.fire('Error', 'El nombre debe mas de   3 hasta 50 caracteres.', 'error');
      return false;
    }
    
    if (!descripcionValida) {
      Swal.fire('Error', 'La descripción debe tener entre 5 y 200 caracteres.', 'error');
      return false;
    }

    return true;
  }

  onSubmit(): void {
    if (!this.validarCampos()) {
      return;
    }

    if (!this.isEditing) {
      this.cursoService.crearCurso(this.curso).subscribe(
        data => {
          console.log('Curso creado:', data);
          this.cursos.push(data);
          this.resetForm();
        },
        error => console.error('Error al guardar curso:', error)
      );
    } else {
      this.cursoService.actualizarCurso(this.editingId!, this.curso).subscribe(
        data => {
          console.log('Curso actualizado:', data);
          const index = this.cursos.findIndex(c => c.id === this.editingId);
          if (index !== -1) {
            this.cursos[index] = data;
          }
          this.resetForm();
        },
        error => console.error('Error al actualizar curso:', error)
      );
    }
  }

  onUpdate(): void {
    this.onSubmit();
  }

  onCancelEdit(): void {
    this.resetForm();
  }

  selectCursos(curso: Curso): void {
    this.selectedCurso = curso;
  }

  onEdit(curso: Curso): void {
    this.cursoService.obtenerCursoId(curso.id).subscribe(
      data => {
        this.curso = { ...data };
        this.isEditing = true;
        this.editingId = curso.id;
      },
      error => console.error('Error al obtener curso para editar:', error)
    );
  }

  onDelete(id: number): void {
    this.cursoService.eliminarCurso(id).subscribe(
      () => {
        Swal.fire('Eliminado', 'El curso ha sido eliminado.', 'success');
        this.cursos = this.cursos.filter(c => c.id !== id);
        this.selectedCurso = null;
      },
      error => Swal.fire('Error', 'No se pudo eliminar el curso.', 'error')
    );
  }

  private resetForm(): void {
    this.curso = { id: 0, nombre: '', descripcion: '', usuario_id: 0, carrera_id: 0 };
    this.isEditing = false;
    this.editingId = null;
    this.selectedCurso = null;
    if (this.cursoForm) {
      this.cursoForm.resetForm();
    }
  }

  getTutorName(usuario_id: number): string {
    const usuario = this.usuarios.find(u => u.id === usuario_id);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Desconocido';
  }

  obtenerCarreras(): void {
    this.carreraService.obtenerListaCarreras().subscribe(
      dato => {
        this.carreras = dato;
      },
      error => console.error('Error al obtener carreras:', error)
    );
  }
}
