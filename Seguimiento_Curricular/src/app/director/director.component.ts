import { Component } from '@angular/core';
import { Actividades } from '../actividades/actividades';
import { ActividadesService } from '../actividades/actividades.service';
import { ActividadRelacion } from '../actividad-relacion/actividad-relacion';
import { ActividadRelacionService } from '../actividad-relacion/actividad-relacion.service';
import { FileService } from '../files/file.service';
import { DatePipe } from '@angular/common';
import { GlobalState } from '../login/GlobalState';
import { UsuarioService } from '../usuario-form/usuario.service';
import { UsuarioEditarService, Usuario, Rol } from '../editar-usuario/usuario-editar.service';
import Swal from 'sweetalert2';

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
  usuarios: Usuario[] = [];
  usuariosnombre: Usuario[] = [];
  roles: Rol[] = [];
  usuarioSeleccionado: Usuario | null = null;
  mostrarTabla: boolean = false;

  constructor(
    private actividadRelacionService: ActividadRelacionService,
    private fileService: FileService,
    private datePipe: DatePipe,
    private actividadesService: ActividadesService,
    private usuarioService: UsuarioService,
    private editarusuarioService: UsuarioEditarService
  ) {}

  ngOnInit(): void {
    this.obtenerUsuarioPorCedula();
    this.obtenerActividadesRelacion();
    this.obtenerActividades();
    this.obtenerUsuarios();
    this.obtenerRoles();
    this.obtenerUsuariosnombre();
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
          relacion.estado = true;
          const nowLocal = new Date();
          const offsetMinutes = nowLocal.getTimezoneOffset(); 
          const offsetMilliseconds = offsetMinutes * 60 * 1000;
          const nowUtc = new Date(nowLocal.getTime() - offsetMilliseconds); 
          relacion.fecha_de_subida = nowUtc;
          this.save(relacion);
        },
        error => {
          console.error('Error uploading file', error);
          if (error.status === 409) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un error',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ese archivo ya existe en el servidor',
            });
          }
        }
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
  //USUARIO
  obtenerUsuariosnombre(): void {
    this.editarusuarioService.obtenerUsuarios().subscribe(
      data => this.usuariosnombre = data,
      error => console.error('Error al obtener usuarios:', error)
    );
  }
    obtenerUsuarios(): void {
      this.editarusuarioService.obtenerUsuarios().subscribe(
        data => {
          this.usuarios = data.filter(usuario => usuario.rol_id === 3 || usuario.rol_id === 4);
          console.log('Usuarios cargados:', this.usuarios);
        },
        error => console.error('Error al obtener usuarios:', error)
      );
    }

 obtenerRoles(): void {
    this.editarusuarioService.obtenerRoles().subscribe(
      data => {
        this.roles = data.filter((rol: any) => rol.id === 3 || rol.id === 4);
      },
      error => console.error('Error al obtener roles:', error)
    );
  }

  seleccionarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario };
  }

  cambiarRol(event: Event, usuario: Usuario): void {
    const target = event.target as HTMLSelectElement;
    const nuevoRolId = +target.value;
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de cambiar el rol del usuario ${usuario.nombre} a ${this.obtenerNombreRol(nuevoRolId)}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        usuario.rol_id = nuevoRolId;
        console.log(`Rol cambiado para usuario ${usuario.nombre}: ${usuario.rol_id}`);
        this.guardarUsuario(usuario);
        Swal.fire(
          '¡Cambiado!',
          'El rol del usuario ha sido cambiado.',
          'success'
        );
      } else {
        // Restablecer el select al valor anterior si el usuario cancela
        target.value = usuario.rol_id.toString();
      }
    });
  }
  
  obtenerNombreRol(rolId: number): string {
    const rol = this.roles.find(r => r.id === rolId);
    return rol ? rol.nombre : 'Desconocido';
  }
  
  guardarUsuario(usuario: Usuario): void {
    console.log('Guardando usuario con rolId:', usuario.rol_id);
    this.editarusuarioService.actualizarUsuario(usuario).subscribe(
      data => {
        console.log('Usuario actualizado:', data);
        const index = this.usuarios.findIndex(u => u.id === data.id);
        if (index !== -1) {
          this.usuarios[index] = data;
        }
      },
      error => console.error('Error al actualizar usuario:', error)
    );
  }

  cancelarEdicion(): void {
    this.usuarioSeleccionado = null;
  }
  toggleTabla(): void {
    this.mostrarTabla = !this.mostrarTabla;
  }
  getUsuarioNombrePorId(usuarioId: number): string {
    const usuario = this.usuariosnombre.find(u => u.id === usuarioId);
    return usuario ? `${usuario.nombre} ${usuario.apellido}` : 'Nombre no encontrado';
  }  

  esFechaPasada(fechaMaxima: Date | undefined, pdf: string | undefined): boolean {
    if (pdf) {
      return false;
    }
  
    if (!fechaMaxima) {
      return false;
    }
  
    const nowLocal = new Date();
    const offsetMinutes = nowLocal.getTimezoneOffset();
    const offsetMilliseconds = offsetMinutes * 60 * 1000;
    const nowUtc = new Date(nowLocal.getTime() - offsetMilliseconds);
  
    return new Date(fechaMaxima).getTime() < nowUtc.getTime();
  }
  

}
