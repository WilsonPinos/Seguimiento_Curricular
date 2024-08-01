import { Component, OnInit } from '@angular/core';
import { PeriodoService } from './periodo.service';
import { CarreraFormService } from '../carrera-form/carrera-form.service';
import { Periodo } from './periodo.model';
import { Carrera } from '../carrera-form/carrera.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {
  periodos: Periodo[] = [];
  carreras: Carrera[] = [];
  periodo: Periodo = new Periodo();

  constructor(
    private periodoService: PeriodoService, 
    private carreraService: CarreraFormService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadPeriodos();
    this.loadCarreras();
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

  onSubmit(): void {
    console.log('Submitting period');
    if (this.periodo.id !== undefined) {
      this.periodoService.updatePeriodo(this.periodo.id, this.periodo).subscribe(() => {
        this.loadPeriodos();
        this.periodo = new Periodo();
      });
    } else {
      this.periodoService.createPeriodo(this.periodo).subscribe((newPeriodo) => {
        this.periodo = newPeriodo;
        this.loadPeriodos();
        this.periodo = new Periodo();
      });
    }
  }

  editPeriodo(periodo: Periodo): void {
    this.periodo = { ...periodo };
  }

  deletePeriodo(id: number): void {
    this.periodoService.deletePeriodo(id).subscribe(() => {
      this.loadPeriodos();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
