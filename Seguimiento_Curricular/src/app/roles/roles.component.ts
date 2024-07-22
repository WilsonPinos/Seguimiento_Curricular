import { Component, OnInit } from '@angular/core';
import { Roles } from './roles';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit{

  roless:Roles[];
  roles:Roles = { id: 0, nombre: '', descripcion: '' }; 
  selectedRoles: Roles | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;

    constructor(private RolesService:RolesService){}

    ngOnInit(): void{
      this.obtenerRoles()
    }
  
    private obtenerRoles(){
      this.RolesService.obtenerListaRoles().subscribe(dato =>{
        this.roless = dato;
      })
    }
    onSubmit(): void {
      console.log('onSubmit called');
      if (!this.isEditing) {
        
        this.RolesService.crearRoles(this.roles).subscribe(
          data => {
            console.log('Carrera creada:', data);
            this.roless.push(data);
            this.resetForm();
          },
          error => console.error('Error al guardar carrera:', error)
        );
      } else {
     
        this.RolesService.actualizarRoles(this.editingId!, this.roles).subscribe(
          data => {
            console.log('Carrera actualizada:', data);
            const index = this.roless.findIndex(c => c.id === this.editingId);
            if (index !== -1) {
              this.roless[index] = data;
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
  
    selectRoles(roles: Roles): void {
      this.selectedRoles = roles;
    }
  
    onEdit(roles: Roles): void {
      this.RolesService.obtenerRolesId(roles.id).subscribe(
        data => {
          this.roles = { ...data };
          this.isEditing = true;
          this.editingId = roles.id;
        },
        error => console.error('Error al obtener carrera para editar:', error)
      );
    }
  
    onDelete(id: number): void {
      this.RolesService.eliminarRoles(id).subscribe(
        () => {
          this.roless = this.roless.filter(c => c.id !== id);
          this.selectedRoles = null;
        },
        error => console.error('Error al eliminar carrera:', error)
      );
    }
  
    private resetForm(): void {
      this.roles = { id: 0, nombre: '', descripcion: '' };
      this.isEditing = false;
      this.editingId = null;
      this.selectedRoles = null;
    }

  
}
