import { Component, OnInit } from '@angular/core';
import { CarreraFormService } from './carrera-form.service'; 
import { Carrera } from './carrera.model'; 

@Component({
  selector: 'app-carrera-form',
  templateUrl: './carrera-form.component.html',
  styleUrls: ['./carrera-form.component.css']
})
export class CarreraFormComponent implements OnInit {
  carreras: Carrera[] = [];
  carrera: Carrera = { id: 0, nombre: '', descripcion: '' }; 
  selectedCarrera: Carrera | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;

  constructor(private carreraService: CarreraFormService) { }

  ngOnInit(): void {
    this.obtenerCarreras();
  }

  obtenerCarreras(): void {
    this.carreraService.obtenerListaCarreras().subscribe(
      data => this.carreras = data,
      error => console.error('Error al obtener carreras:', error)
    );
  }

  onSubmit(): void {
    console.log('onSubmit called');
    if (!this.isEditing) {
      
      this.carreraService.crearCarrera(this.carrera).subscribe(
        data => {
          console.log('Carrera creada:', data);
          this.carreras.push(data);
          this.resetForm();
        },
        error => console.error('Error al guardar carrera:', error)
      );
    } else {
   
      this.carreraService.actualizarCarrera(this.editingId!, this.carrera).subscribe(
        data => {
          console.log('Carrera actualizada:', data);
          const index = this.carreras.findIndex(c => c.id === this.editingId);
          if (index !== -1) {
            this.carreras[index] = data;
          }
          this.resetForm();
        },
        error => console.error('Error al actualizar carrera:', error)
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
      error => console.error('Error al obtener carrera para editar:', error)
    );
  }

  onDelete(id: number): void {
    this.carreraService.eliminarCarrera(id).subscribe(
      () => {
        this.carreras = this.carreras.filter(c => c.id !== id);
        this.selectedCarrera = null;
      },
      error => console.error('Error al eliminar carrera:', error)
    );
  }

  private resetForm(): void {
    this.carrera = { id: 0, nombre: '', descripcion: '' };
    this.isEditing = false;
    this.editingId = null;
    this.selectedCarrera = null;
  }
}
