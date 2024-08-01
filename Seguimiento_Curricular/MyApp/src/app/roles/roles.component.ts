import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Roles } from './roles';
import { RolesService } from './roles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  @ViewChild('carreraForm', { static: false }) carreraForm: NgForm;

  roless: Roles[];
  roles: Roles = { id: 0, nombre: '', descripcion: '' }; 
  selectedRoles: Roles | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;

  constructor(private rolesService: RolesService) { }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  private obtenerRoles(): void {
    this.rolesService.obtenerListaRoles().subscribe(
      (dato: Roles[]) => {
        this.roless = dato;
      },
      error => console.error('Error al obtener roles:', error)
    );
  }

  validarCampos(): boolean {
    const nombreValido = this.roles.nombre.trim().length >= 3 && this.roles.nombre.trim().length <= 50;
    const descripcionValida = this.roles.descripcion.trim().length >= 5 && this.roles.descripcion.trim().length <= 200;
    
    if (!nombreValido) {
      Swal.fire('Error', 'El nombre debe tener mas de 3 hasta 50 caracteres.', 'error');
      return false;
    }
    
    if (!descripcionValida) {
      Swal.fire('Error', 'la descripcion debe ser mas de 3 hasta 50 caracteres.', 'error');
      return false;
    }

    return true;
  }

  onSubmit(): void {
    if (this.validarCampos()) {
      if (!this.isEditing) {
        this.rolesService.crearRoles(this.roles).subscribe(
          data => {
            this.roless.push(data);
            this.resetForm();
          },
          error => console.error('Error al guardar rol:', error)
        );
      } else {
        this.rolesService.actualizarRoles(this.editingId!, this.roles).subscribe(
          data => {
            const index = this.roless.findIndex(c => c.id === this.editingId);
            if (index !== -1) {
              this.roless[index] = data;
            }
            this.resetForm();
          },
          error => console.error('Error al actualizar rol:', error)
        );
      }
    } else {
      this.markFormAsTouched();
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
    this.rolesService.obtenerRolesId(roles.id).subscribe(
      data => {
        this.roles = { ...data };
        this.isEditing = true;
        this.editingId = roles.id;
      },
      error => console.error('Error al obtener rol para editar:', error)
    );
  }

  onDelete(id: number): void {
    this.rolesService.eliminarRoles(id).subscribe(
      () => {
        this.roless = this.roless.filter(c => c.id !== id);
        this.selectedRoles = null;
      },
      error => console.error('Error al eliminar rol:', error)
    );
  }

  private resetForm(): void {
    this.roles = { id: 0, nombre: '', descripcion: '' };
    this.isEditing = false;
    this.editingId = null;
    this.selectedRoles = null;
    if (this.carreraForm) {
      this.carreraForm.resetForm();
    }
  }

  private markFormAsTouched(): void {
    Object.keys(this.carreraForm.controls).forEach(field => {
      const control = this.carreraForm.control.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}
