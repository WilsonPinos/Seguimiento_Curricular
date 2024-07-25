import { Component, OnInit, ViewChild, ElementRef, model } from '@angular/core';

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
  cursos: Curso[] = [];
  curso: Curso = { id: 0, nombre: '', descripcion: '', usuario_id: 0, carrera_id: 0 };
  selectedCurso: Curso | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;

  usuarios: Usuario[];
  carreras: Carrera[];
  //Carreras: Carrera[] = []



  constructor(
    private cursoService: CursoService,

    private usuarioService: UsuarioService,
    private carreraService: CarreraFormService


  ) { }

  ngOnInit(): void {
    this.obtenerCurso();
    this.obtenerUsuario();
    this.obtenerCarreras();

  }

  obtenerCurso(): void {
    this.cursoService.obtenerListaCurso().subscribe(data => {
      this.cursos = data;
    }, error => {
      console.error("Error al recuperar cursos", error); // Manejo de errores
    });
  }




  onSubmit(): void {
    console.log('onSubmit called');
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
      this.cursoService.actualizarcurso(this.editingId!, this.curso).subscribe(
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

  selectCursos(cursos: Curso): void {
    this.selectedCurso = cursos;
  }

  onEdit(cursos: Curso): void {
    this.cursoService.obtenerCursoId(cursos.id).subscribe(
      data => {
        this.curso = { ...data };
        this.isEditing = true;
        this.editingId = cursos.id;

      },
      error => console.error('Error😥 al obtener cursos para editar:', error)
    );
  }

  onDelete(id: number): void {
    this.cursoService.obtenerCursoId(id).subscribe(
      data => {
        this.cursoService.eliminarcurso(id).subscribe(
          () => {
            Swal.fire('Eliminado', 'el curso  ha sido eliminada.', 'success');
            this.cursos = this.cursos.filter(c => c.id !== id);
            this.selectedCurso = null;
          },
          error => Swal.fire('Error', 'No se pudo eliminar el curso.', 'error')
        );
      },
      error => Swal.fire('Error', 'No se pudo obtener el curso.', 'error')
    );
  }

  private resetForm(): void {
    this.curso = { id: 0, nombre: '', descripcion: '', usuario_id: 0, carrera_id: 0 };
    this.isEditing = false;
    this.editingId = null;
    this.selectedCurso = null;


  }


  //Usuario
  private obtenerUsuario() {
    this.usuarioService.listarUsuarios().subscribe(dato => {
      this.usuarios = dato;
    })
  }

  //carrera 
  obtenerCarreras(): void {
    this.carreraService.obtenerListaCarreras().subscribe(dato => {
      this.carreras = dato;

    });

  }


}
