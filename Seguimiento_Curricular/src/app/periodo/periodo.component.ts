import { Component, OnInit } from '@angular/core';
import { PeriodoService } from './periodo.service';
import { CarreraFormService } from '../carrera-form/carrera-form.service';
import { PeriodoCarreraService } from './periodo-carrera.service';
import { Periodo } from './periodo.model';
import { Carrera } from '../carrera-form/carrera.model';
import { PeriodoCarrera } from './periodo-carrera.model';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {
  periodos: Periodo[] = [];
  carreras: Carrera[] = [];
  periodoCarreras: PeriodoCarrera[] = [];
  periodo: Periodo = new Periodo();
  periodoCarrera: PeriodoCarrera = new PeriodoCarrera(0, 0);

  constructor(
    private periodoService: PeriodoService, 
    private carreraService: CarreraFormService,
    private periodoCarreraService: PeriodoCarreraService
  ) { }

  ngOnInit(): void {
    this.loadPeriodos();
    this.loadCarreras();
    this.loadPeriodoCarreras();
  }

  loadPeriodos(): void {
    this.periodoService.getPeriodos().subscribe((data: Periodo[]) => {
      this.periodos = data;
    });
  }

  loadCarreras(): void {
    this.carreraService.obtenerListaCarreras().subscribe((data: Carrera[]) => {
      this.carreras = data;
    });
  }

  loadPeriodoCarreras(): void {
    this.periodoCarreraService.getPeriodoCarreras().subscribe((data: PeriodoCarrera[]) => {
      this.periodoCarreras = data;
    });
  }

  onSubmit(): void {
    if (this.periodo.id !== undefined) {
      this.periodoService.updatePeriodo(this.periodo.id, this.periodo).subscribe(() => {
        this.createPeriodoCarrera();
        this.loadPeriodos();
        this.periodo = new Periodo();
      });
    } else {
      this.periodoService.createPeriodo(this.periodo).subscribe((newPeriodo) => {
        this.periodo = newPeriodo;
        this.createPeriodoCarrera();
        this.loadPeriodos();
        this.periodo = new Periodo();
      });
    }
  }

  createPeriodoCarrera(): void {
    if (this.periodo.id !== undefined && this.periodo.carrera_id !== undefined) {
      this.periodoCarrera.periodo_id = this.periodo.id;
      this.periodoCarrera.carrera_id = this.periodo.carrera_id;
      this.periodoCarreraService.createPeriodoCarrera(this.periodoCarrera).subscribe(() => {
        this.loadPeriodoCarreras();
        this.periodoCarrera = new PeriodoCarrera(0, 0);
      });
    } else {
      console.error('Periodo ID or Carrera ID is undefined');
    }
  }

  deletePeriodoCarrera(id: number): void {
    this.periodoCarreraService.deletePeriodoCarrera(id).subscribe(() => {
      this.loadPeriodoCarreras();
    });
  }

  getCarreraNombre(id?: number): string {
    const carrera = this.carreras.find(c => c.id === id);
    return carrera ? carrera.nombre : '';
  }

  editPeriodo(periodo: Periodo): void {
    this.periodo = { ...periodo };
  }

  deletePeriodo(id: number): void {
    this.periodoService.deletePeriodo(id).subscribe(() => {
      this.loadPeriodos();
    });
  }
}
