import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Actividades } from './actividades';
import { ActividadesService } from './actividades.service';
import { DatePipe, Location } from '@angular/common';
import { FileService } from '../files/file.service';
import Swal from 'sweetalert2';
import { Roles } from '../roles/roles';
import { RolesService } from '../roles/roles.service';
import { Periodo } from '../periodo/periodo.model';
import { PeriodoService } from '../periodo/periodo.service';
import { UsuarioService } from '../usuario-form/usuario.service';
import { ActividadRelacion } from '../actividad-relacion/actividad-relacion';
import { ActividadRelacionService } from '../actividad-relacion/actividad-relacion.service';
import { Usuario } from '../usuario-form/usuario.model';

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  actividadess: Actividades[] = [];
  actividades: Actividades = { id: 0, nombre: '', descripcion: '', fecha_entregado: new Date(), fecha_entrega_max: new Date(), ruta_pdf: '', rol_id:0, activo:false, periodo_id:0 };
  selectedActividades: Actividades | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;
  selectedFile: File | null = null;
  roless:Roles[];
  periodos: Periodo[] = [];
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild('actividadForm', { static: false }) actividadForm: NgForm; // Add this line

  currentFileName: string | null = null;
  usuarios: Usuario[] = [];
  rolIdSeleccionado: number;
  originalActividad: Actividades | null = null;

  constructor(
    private actividadesService: ActividadesService,
    private fileService: FileService,
    private datePipe: DatePipe,
    private RolesService:RolesService,
    private periodoService: PeriodoService,
    private usuarioService: UsuarioService,
    private actividadRelacionService: ActividadRelacionService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.obtenerActividades();
    this.obtenerRoles();
    this.loadPeriodos();
    this.obtenerUsuarios();
  }
  private obtenerUsuarios(): void {
    this.usuarioService.obtenerListaUsuarios().subscribe(
      usuarios => {
        this.usuarios = usuarios;
        console.log('Usuarios cargados:', this.usuarios);
      },
      error => console.error('Error al obtener usuarios:', error)
    );
  }

  private obtenerActividades(): void {
  this.actividadesService.obtenerListaActividades().subscribe(
    dato => {
      this.actividadess = dato;
    },
    error => console.error('Error al obtener actividades:', error)
  );
}
validarCampos(): boolean {
  const nombreValido = this.actividades.nombre.trim().length >= 3 && this.actividades.nombre.trim().length <= 50;
  const descripcionValida = this.actividades.descripcion.trim().length >= 5 && this.actividades.descripcion.trim().length <= 200;
 // const fechaMaxValida = this.actividades.fecha_entrega_max instanceof Date && !isNaN(this.actividades.fecha_entrega_max.getTime());
  const rolValido = this.actividades.rol_id > 0;
  const periodoValido = this.actividades.periodo_id > 0;

  if (!nombreValido) {
    Swal.fire('Error', 'El nombre debe tener entre 3 y 50 caracteres.', 'error');
    return false;
  }
  if (!descripcionValida) {
    Swal.fire('Error', 'La descripción debe tener entre 5 y 200 caracteres.', 'error');
    return false;
  }
 // if (!fechaMaxValida) {
  //  Swal.fire('Error', 'La fecha máxima de entrega no es válida.', 'error');
  //  return false;
 // }
  if (!rolValido) {
    Swal.fire('Error', 'Debes seleccionar un rol.', 'error');
    return false;
  }
  if (!periodoValido) {
    Swal.fire('Error', 'Debes seleccionar un periodo.', 'error');
    return false;
  }
  return true;
}


  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (this.validarCampos()) {
    if (!this.currentFileName?.includes("")) {
      if (!this.selectedFile) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Por favor, selecciona un archivo PDF antes de enviar.'
        });
        return;
      }
    }
  
    if (this.selectedFile) {
      this.fileService.uploadFile(this.selectedFile).subscribe(
        response => {
          console.log('File upload response:', response);
          this.actividades.ruta_pdf = response.fileName;
          this.createActividad();
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'A file with the same name already exists. Please choose a different file.'
          });
        }
      );
    } else {
      this.createActividad();
    }
  }
  }
  
  private createActividad(): void {
    this.actividadesService.crearActividades(this.actividades).subscribe(
      data => {
        console.log('Actividad creada:', data);
        if (data.id && this.actividades.rol_id) {
          this.crearActividadesRelacion(data.id, this.actividades.rol_id);
        } else {
          console.error('Error: ID de actividad o rol_id no disponible');
        }
        this.actividadess.push(data);
        this.obtenerActividades();
        this.resetForm();
        this.currentFileName = null;
      },
      error => console.error('Error al guardar Actividad:', error)
    );
  }

private crearActividadesRelacion(actividadId: number, rolId: number): void {
  console.log('Rol ID seleccionado:', rolId);
  console.log('Usuarios antes del filtro:', this.usuarios);

  const usuariosPorRol = this.usuarios.filter(usuario => usuario.rol_id === Number(rolId));

  console.log('Usuarios por rol:', usuariosPorRol);

  const actividadesRelacion: ActividadRelacion[] = usuariosPorRol
    .filter(usuario => usuario.id !== undefined)
    .map(usuario => ({
      id: 0,
      estado: false,
      pdf: '',
      actividad_id: actividadId,
      usuario_id: usuario.id!,
      observacion: '',
      fecha_de_subida: new Date(2000, 0, 1)
    }));

  console.log('ActividadesRelacion:', actividadesRelacion);

  actividadesRelacion.forEach(actividadRelacion => {
    this.actividadRelacionService.crearActividadesRelacion(actividadRelacion).subscribe(
      response => {
        console.log('ActividadRelacion creada:', response);
      },
      error => console.error('Error al crear ActividadRelacion:', error)
    );
  });
}
  
private updateActividadInMemory(): void {
  if (this.editingId === null) return;

  const index = this.actividadess.findIndex(actividad => actividad.id === this.editingId);
  if (index !== -1) {
    this.actividadess[index] = { ...this.actividades, id: this.editingId };
  } else {
    console.error('Actividad no encontrada en la lista');
  }
}




onUpdate(): void {
  if (this.validarCampos()) {
  if (this.editingId === null) return;

  this.actividadesService.actualizarActividades(this.editingId, this.actividades).subscribe(
    data => {
      console.log('Actividad actualizada:', data);
      // Actualiza en memoria
      this.updateActividadInMemory();
      this.obtenerActividades();
      this.resetForm();
      this.currentFileName = null;
    },
    error => console.error('Error al actualizar Actividad:', error)
  );
}
}


onCancelEdit(): void {
  if (this.originalActividad) {
    const index = this.actividadess.findIndex(actividad => actividad.id === this.originalActividad?.id);
    if (index !== -1) {
      this.actividadess[index] = { ...this.originalActividad };
    }
  }
  this.resetForm();
}

  selectActividades(actividades: Actividades): void {
    this.selectedActividades = actividades;
  }

  onEdit(actividades: Actividades): void {
    this.actividadesService.obtenerActividadesId(actividades.id).subscribe(
      data => {
        this.actividades = { ...data };
        this.isEditing = true;
        this.editingId = actividades.id;
        this.currentFileName = data.ruta_pdf;
      },
      error => console.error('Error al obtener Actividad para editar:', error)
    );
  }
  


    onDelete(id: number): void {
      this.actividadesService.obtenerActividadesId(id).subscribe(
        data => {
          const fileName = data.ruta_pdf; 
    
          this.actividadesService.eliminarActividades(id).subscribe(
            () => {
              if (fileName) {
                this.fileService.deleteFile(fileName).subscribe(
                  () => {
                    Swal.fire('Eliminado', 'La actividad y el archivo han sido eliminados.', 'success');
                    this.actividadess = this.actividadess.filter(c => c.id !== id);
                    this.selectedActividades = null;
                  },
                  error => Swal.fire('Error', 'No se pudo eliminar el archivo.', 'error')
                );
              } else {
                Swal.fire('Eliminado', 'La actividad ha sido eliminada.', 'success');
                this.actividadess = this.actividadess.filter(c => c.id !== id);
                this.selectedActividades = null;
              }
            },
            error => console.error('Error al eliminar Actividad:', error)
          );
        },
        error => console.error('Error al obtener Actividad:', error)
      );
    }
    

  private resetForm(): void {
    this.actividades = { id: 0, nombre: '', descripcion: '', fecha_entregado: new Date(), fecha_entrega_max: new Date(), ruta_pdf: '', rol_id:0, activo:false, periodo_id:0 };
    this.isEditing = false;
    this.editingId = null;
    this.selectedActividades = null;
    this.selectedFile = null; // Limpia el archivo seleccionado
     // Limpia el valor del selector de archivos
     if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  quitarSeleccion(): void{
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
  }


  formatFecha(fecha: Date): string {
    return this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm', 'UTC') || '';
  }

  downloadFile(actividad: Actividades): void {
    this.fileService.downloadFile(actividad.ruta_pdf).subscribe(
      blob => {
        this.fileService.saveFile(blob, actividad.ruta_pdf);
      },
      error => console.error('Error downloading file', error)
    );
  }


  //roles
  private obtenerRoles(){
    this.RolesService.obtenerListaRoles().subscribe(dato =>{
      this.roless = dato;
    })
  }
  //periodos
  loadPeriodos(): void {
    this.periodoService.getPeriodos().subscribe((data: Periodo[]) => {
      this.periodos = data;
    });
  }
  onDeleteFile(fileName: string): void {
    this.fileService.deleteFile(fileName).subscribe(
      () => {
        Swal.fire('Eliminado', 'El archivo ha sido eliminado.', 'success');
        this.obtenerActividades();
      },
      error => Swal.fire('Error', 'No se pudo eliminar el archivo.', 'error')
    );
  }
  goBack(): void {
    this.location.back();
  }
}
