import { Component } from '@angular/core';
import { Actividades } from '../actividades/actividades';
import { ActividadesService } from '../actividades/actividades.service';
import { ActividadRelacion } from '../actividad-relacion/actividad-relacion';
import { ActividadRelacionService } from '../actividad-relacion/actividad-relacion.service';
import { FileService } from '../files/file.service';
import { DatePipe } from '@angular/common';
import { GlobalState } from '../login/GlobalState';
import { UsuarioService } from '../usuario-form/usuario.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrl: './director.component.css'
})
export class DirectorComponent {
  relacionactividadess: ActividadRelacion[] = [];
  actividadess: Actividades[] = [];
  selectedFiles: { [key: number]: File | null } = {};
  cedula: string = GlobalState.cedula;
  usuarioId: number | null | undefined = null;

  constructor(
    private actividadRelacionService: ActividadRelacionService,
    private fileService: FileService,
    private datePipe: DatePipe,
    private actividadesService: ActividadesService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarioPorCedula();
    this.obtenerActividadesRelacion();
    this.obtenerActividades();
  }

  private obtenerActividades(): void {
    this.actividadesService.obtenerListaActividades().subscribe(dato => {
      this.actividadess = dato;
    });
  }

  private obtenerActividadesRelacion(): void {
    if (this.usuarioId !== null) {
      this.actividadRelacionService.obtenerListaActividadesRelacion().subscribe(dato => {
        this.relacionactividadess = dato.filter(relacion => relacion.usuario_id === this.usuarioId);
      });
    }
  }
  private obtenerUsuarioPorCedula(): void {
    this.usuarioService.obtenerListaUsuarios().subscribe(usuarios => {
      const usuario = usuarios.find(u => u.cedula === this.cedula);
      if (usuario) {
        this.usuarioId = usuario.id;
        this.obtenerActividadesRelacion();
      }
    });
  }

  downloadFile(fileName: string | undefined): void {
    if (fileName) {
      this.fileService.downloadFile(fileName).subscribe(
        blob => {
          this.fileService.saveFile(blob, fileName);
        },
        error => console.error('Error downloading file', error)
      );
    }
  }

  formatFecha(fecha: Date | undefined): string {
    return fecha ? this.datePipe.transform(fecha, 'dd/MM/yyyy HH:mm', 'UTC') || '' : '';
  }

  getActividadNombre(id: number): string {
    const actividad = this.actividadess.find(a => a.id === id);
    return actividad ? actividad.nombre : '';
  }

  getActividadFechaEntregaMax(id: number): Date | undefined {
    const actividad = this.actividadess.find(a => a.id === id);
    return actividad ? actividad.fecha_entrega_max : undefined;
  }

  getActividadPdf(id: number): string | undefined {
    const actividad = this.actividadess.find(a => a.id === id);
    return actividad ? actividad.ruta_pdf : undefined;
  }

  onFileSelected(event: any, relacion: ActividadRelacion): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFiles[relacion.id] = file;
    }
  }

  uploadFile(relacion: ActividadRelacion): void {
    const file = this.selectedFiles[relacion.id];
    if (file) {
      this.fileService.uploadFile(file).subscribe(
        response => {
          relacion.pdf = file.name; 
          this.save(relacion); 
        },
        error => console.error('Error uploading file', error)
      );
    }
  }

  save(relacion: ActividadRelacion): void {
    this.actividadRelacionService.actualizarActividadRelacion(relacion).subscribe(
      () => {
        console.log('Relacion actividad updated successfully');
      },
      error => console.error('Error updating relacion actividad', error)
    );
  }
}
