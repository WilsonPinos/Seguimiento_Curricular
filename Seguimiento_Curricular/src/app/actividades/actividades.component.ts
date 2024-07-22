import { Component, OnInit } from '@angular/core';
import { Actividades } from './actividades';
import { ActividadesService } from './actividades.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrl: './actividades.component.css'
})
export class ActividadesComponent implements OnInit{
  actividadess:Actividades[];
  actividades:Actividades = { id: 0, nombre: '', descripcion: '',fecha_entregado:new Date(), fecha_entrega_max:new Date(), ruta_pdf: '' }; 
  selectedActividades: Actividades | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;

    constructor(private ActividadesService:ActividadesService, private datePipe: DatePipe){}

    ngOnInit(): void{
      this.obtenerActividades()
    }
  
    private obtenerActividades(){
      this.ActividadesService.obtenerListaActividades().subscribe(dato =>{
        this.actividadess = dato;
      })
    }
    onSubmit(): void {
      console.log('onSubmit called');
      if (!this.isEditing) {
        
        this.ActividadesService.crearActividades(this.actividades).subscribe(
          data => {
            console.log('Actividad creada:', data);
            this.actividadess.push(data);
            this.resetForm();
          },
          error => console.error('Error al guardar Actividad:', error)
        );
      } else {
     
        this.ActividadesService.actualizarActividades(this.editingId!, this.actividades).subscribe(
          data => {
            console.log('Actividad actualizada:', data);
            const index = this.actividadess.findIndex(c => c.id === this.editingId);
            if (index !== -1) {
              this.actividadess[index] = data;
            }
            this.resetForm();
          },
          error => console.error('Error al actualizar Actividad:', error)
        );
      }
    }
  
    onUpdate(): void {
      this.onSubmit();
    }
  
    onCancelEdit(): void {
      this.resetForm();
    }
  
    selectActividades(actividades: Actividades): void {
      this.selectedActividades = actividades;
    }
  
    onEdit(actividades: Actividades): void {
      this.ActividadesService.obtenerActividadesId(actividades.id).subscribe(
        data => {
          this.actividades = { ...data };
          this.isEditing = true;
          this.editingId = actividades.id;
        },
        error => console.error('Error al obtener Actividad para editar:', error)
      );
    }
  
    onDelete(id: number): void {
      this.ActividadesService.eliminarActividades(id).subscribe(
        () => {
          this.actividadess = this.actividadess.filter(c => c.id !== id);
          this.selectedActividades = null;
        },
        error => console.error('Error al eliminar Actividad:', error)
      );
    }
  
    private resetForm(): void {
      this.actividades = { id: 0, nombre: '', descripcion: '',fecha_entregado:new Date(), fecha_entrega_max:new Date(), ruta_pdf: '' };
      this.isEditing = false;
      this.editingId = null;
      this.selectedActividades = null;
    }
    formatFecha(fecha: Date): string {
      return this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm', 'UTC') || '';
    }
    
}
