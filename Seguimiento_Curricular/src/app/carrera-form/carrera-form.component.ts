import { Component } from '@angular/core';

interface Carrera {
  id: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-carrera-form',
  templateUrl: './carrera-form.component.html',
  styleUrls: ['./carrera-form.component.css']
})
export class CarreraFormComponent {
  carreras: Carrera[] = [
    { id: 1, nombre: 'Ingeniería de Sistemas', descripcion: 'ingeniera mmm sistematica de sistemas simestados' },
    { id: 2, nombre: 'Medicina', descripcion: 'puro paracetamol joven' }
  ];
  carrera: Carrera = { id: 0, nombre: '', descripcion: '' };
  selectedCarrera: Carrera | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;

  onSubmit() {
    if (!this.isEditing) {
      this.carrera.id = this.carreras.length + 1;
      this.carreras.push({ ...this.carrera });
    } else {
      const index = this.carreras.findIndex(c => c.id === this.editingId);
      if (index !== -1) {
        this.carreras[index] = { ...this.carrera, id: this.editingId! };
        this.isEditing = false;
        this.editingId = null;
      }
    }
    this.carrera = { id: 0, nombre: '', descripcion: '' };
  }

  selectCarrera(carrera: Carrera) {
    this.selectedCarrera = carrera;
  }

  onEdit(carrera: Carrera | null) {
    if (carrera) {
      this.carrera = { ...carrera };
      this.isEditing = true;
      this.editingId = carrera.id;
    }
  }

  onDelete(id: number | undefined) {
    if (id !== undefined) {
      this.carreras = this.carreras.filter(c => c.id !== id);
      this.selectedCarrera = null;
    }
  }

  onUpdate() {
    this.onSubmit();
  }

  onCancelEdit() {
    this.isEditing = false;
    this.editingId = null;
    this.carrera = { id: 0, nombre: '', descripcion: '' };
    this.selectedCarrera = null;
  }
}
