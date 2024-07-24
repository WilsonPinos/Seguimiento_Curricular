import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Actividades } from './actividades';
import { ActividadesService } from './actividades.service';
import { DatePipe } from '@angular/common';
import { FileService } from '../files/file.service';
import Swal from 'sweetalert2';
import { Roles } from '../roles/roles';
import { RolesService } from '../roles/roles.service';
import { Periodo } from '../periodo/periodo.model';
import { PeriodoService } from '../periodo/periodo.service';


@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  actividadess: Actividades[] = [];
  actividades: Actividades = { id: 0, nombre: '', descripcion: '', fecha_entregado: new Date(), fecha_entrega_max: new Date(), ruta_pdf: '', rol_id:0, activo:false, ruta_subido:'', periodo_id:0 };
  selectedActividades: Actividades | null = null;
  isEditing: boolean = false;
  editingId: number | null = null;
  selectedFile: File | null = null;
  roless:Roles[];
  periodos: Periodo[] = [];
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  currentFileName: string | null = null;

  constructor(
    private actividadesService: ActividadesService,
    private fileService: FileService,
    private datePipe: DatePipe,
    private RolesService:RolesService,
    private periodoService: PeriodoService
  ) {}

  ngOnInit(): void {
    this.obtenerActividades();
    this.obtenerRoles();
    this.loadPeriodos();
  }

  private obtenerActividades(): void {
    this.actividadesService.obtenerListaActividades().subscribe(dato => {
      this.actividadess = dato;
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if(!this.currentFileName?.includes("")){
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
  
  private createActividad(): void {
    this.actividadesService.crearActividades(this.actividades).subscribe(
      data => {
        console.log('Actividad creada:', data);
        this.actividadess.push(data);
        this.obtenerActividades();
        this.resetForm();
        this.currentFileName = null;
      },
      error => console.error('Error al guardar Actividad:', error)
      
    );
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

  /* onDelete(id: number): void {
    this.actividadesService.eliminarActividades(id).subscribe(
      () => {
        this.actividadess = this.actividadess.filter(c => c.id !== id);
        this.selectedActividades = null;
      },
      error => console.error('Error al eliminar Actividad:', error)
    );
  } */
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
    this.actividades = { id: 0, nombre: '', descripcion: '', fecha_entregado: new Date(), fecha_entrega_max: new Date(), ruta_pdf: '', rol_id:0, activo:false, ruta_subido:'', periodo_id:0 };
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
  
}
