import { Component, OnInit } from '@angular/core';
import { VincularPeriodoCarreraService } from './vincular-periodo-carrera.service';
import { Periodo } from '../periodo/periodo.model';
import { Carrera } from '../carrera-form/carrera.model';
import { PeriodoService } from '../periodo/periodo.service';
import { CarreraFormService } from '../carrera-form/carrera-form.service';
import { VincularPeriodoCarrera } from './vincular-periodo-carrera';
import { Location } from '@angular/common'; // Importa Location

@Component({
  selector: 'app-vincular-periodo-carrera',
  templateUrl: './vincular-periodo-carrera.component.html',
  styleUrls: ['./vincular-periodo-carrera.component.css']
})
export class VincularPeriodoCarreraComponent implements OnInit {
  periodoss: Periodo[] = [];
  carrerass: Carrera[] = [];
  periodo_carrerass: VincularPeriodoCarrera[] = [];
  periodo_carreras: VincularPeriodoCarrera = { id: 0, periodo_id: 0, carrera_id: 0 };
  selectedPeriodoCarreras: VincularPeriodoCarrera | null = null;
  isEditing: boolean = false;

  constructor(
    private vincularPeriodoCarreraService: VincularPeriodoCarreraService,
    private periodoService: PeriodoService,
    private carreraFormService: CarreraFormService,
    private location: Location // Agrega Location al constructor
  ) {}

  ngOnInit() {
    this.obtenerPeriodos();
    this.obtenerCarreras();
    this.obtenerPeriodos_Carreras();
  }

  private obtenerPeriodos_Carreras(): void {
    this.vincularPeriodoCarreraService.obtenerListaPeriodo_carreras().subscribe(dato => {
      this.periodo_carrerass = dato;
    });
  }

  private obtenerPeriodos(): void {
    this.periodoService.getPeriodos().subscribe(dato => {
      this.periodoss = dato;
    });
  }

  private obtenerCarreras(): void {
    this.carreraFormService.obtenerListaCarreras().subscribe(dato => {
      this.carrerass = dato;
    });
  }

  selectPeriodoCarreras(vincularPeriodoCarrera: VincularPeriodoCarrera): void {
    this.selectedPeriodoCarreras = vincularPeriodoCarrera;
  }

  onSubmit(): void {
    if (!this.isEditing) {
      this.vincularPeriodoCarreraService.crearPeriodoCarrera(this.periodo_carreras).subscribe(dato => {
        this.obtenerPeriodos_Carreras();
        this.resetForm();
      });
    } else {
      this.onUpdate();
    }
  }

  onUpdate(): void {
    this.vincularPeriodoCarreraService.actualizarPeriodoCarrera(this.periodo_carreras).subscribe(dato => {
      this.obtenerPeriodos_Carreras();
      this.resetForm();
      this.isEditing = false;
    });
  }

  onCancelEdit(): void {
    this.resetForm();
    this.isEditing = false;
  }

  private resetForm(): void {
    this.periodo_carreras = { id: 0, periodo_id: 0, carrera_id: 0 };
    this.selectedPeriodoCarreras = null;
  }

  onEdit(vincularPeriodoCarrera: VincularPeriodoCarrera): void {
    this.periodo_carreras = { ...vincularPeriodoCarrera };
    this.isEditing = true;
  }

  onDelete(id: number): void {
    this.vincularPeriodoCarreraService.eliminarPeriodoCarrera(id).subscribe(dato => {
      this.obtenerPeriodos_Carreras();
    });
  }

  getPeriodoNombre(id: number): string {
    const periodo = this.periodoss.find(p => p.id === id);
    return periodo ? periodo.nombre ?? 'Desconocido' : 'Desconocido';
  }

  getCarreraNombre(id: number): string {
    const carrera = this.carrerass.find(c => c.id === id);
    return carrera ? carrera.nombre ?? 'Desconocido' : 'Desconocido';
  }

  goBack(): void {
    this.location.back();
  }
}
