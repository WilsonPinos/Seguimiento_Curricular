import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.obtenerCursos();
  }

  private obtenerCursos() {
    this.cursoService.obtenerListaCursos().subscribe(dato => {
      this.cursos = dato;
      console.log(this.cursos); // Verifica que los datos se están recibiendo correctamente
    }, error => {
      console.error("Error fetching cursos:", error); // Manejo de errores
    });
  }

  editarCurso(curso: Curso) {
    // Lógica para editar el curso
    console.log('Editar curso:', curso);
  }

  borrarCurso(curso_id: number) {
    // Lógica para borrar el curso
    console.log('Borrar curso con ID:', curso_id);
  }
  
}
