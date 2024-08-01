import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActividadRelacionService } from './actividad-relacion.service';
import { ActividadRelacion } from './actividad-relacion';
import { DatePipe } from '@angular/common';
import { FileService } from '../files/file.service';
import { ActividadesService } from '../actividades/actividades.service';
import { Actividades } from '../actividades/actividades';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-actividad-relacion',
  templateUrl: './actividad-relacion.component.html',
  styleUrls: ['./actividad-relacion.component.css']
})
export class ActividadRelacionComponent implements OnInit {
  @ViewChild('barCanvas') barCanvas: ElementRef;
  barChart: any;

  relacionactividadess: ActividadRelacion[] = [];
  actividadess: Actividades[] = [];
  editingId: number | null = null;

  constructor(
    private actividadRelacionService: ActividadRelacionService,
    private fileService: FileService,
    private datePipe: DatePipe,
    private actividadesService: ActividadesService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.obtenerActividadesRelacion();
    this.obtenerActividades();
  }

  private obtenerActividades(): void {
    this.actividadesService.obtenerListaActividades().subscribe(dato => {
      this.actividadess = dato;
      this.updateChartData();
    });
  }

  private obtenerActividadesRelacion(): void {
    this.actividadRelacionService.obtenerListaActividadesRelacion().subscribe(dato => {
      this.relacionactividadess = dato;
      this.updateChartData();
    });
  }

  private updateChartData(): void {
    const actividadSubidasCount = this.actividadess.reduce((acc: { [key: string]: number }, actividad) => {
      acc[actividad.nombre] = (acc[actividad.nombre] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(actividadSubidasCount);
    const data = Object.values(actividadSubidasCount);

    if (this.barChart) {
      this.barChart.destroy();
    }

    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Actividades Subidas',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
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
    if (!fecha) return '';

    const date = new Date(fecha);
    if (date.getFullYear() === 2000) {
      return 'Sin fecha';
    }
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm', 'UTC') || '';
  }

  getActividadNombre(id: number): string {
    const actividad = this.actividadess.find(a => a.id === id);
    return actividad ? actividad.nombre : '';
  }

  getActividadFechaEntregado(id: number): Date | undefined {
    const actividad = this.actividadess.find(a => a.id === id);
    return actividad ? actividad.fecha_entregado : undefined;
  }

  getActividadFechaEntregaMax(id: number): Date | undefined {
    const actividad = this.actividadess.find(a => a.id === id);
    return actividad ? actividad.fecha_entrega_max : undefined;
  }

  getActividadPdf(id: number): string | undefined {
    const actividad = this.actividadess.find(a => a.id === id);
    return actividad ? actividad.ruta_pdf : undefined;
  }

  isEditing(id: number): boolean {
    return this.editingId === id;
  }

  edit(id: number): void {
    this.editingId = id;
  }

  save(relacion: ActividadRelacion): void {
    this.actividadRelacionService.actualizarActividadRelacion(relacion).subscribe(
      () => {
        console.log('Relacion actividad updated successfully');
        this.editingId = null;
      },
      error => console.error('Error updating relacion actividad', error)
    );
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

  goBack(): void {
    this.location.back();
  }
}
