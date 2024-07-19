import { Component, OnInit } from '@angular/core';
import { PeriodoService } from './periodo.service';
import { CarreraService } from '../carrera-form/carrera-form.service';
import { Periodo } from './periodo.model';
import { CarreraFormComponent } from '../carrera-form/carrera-form.component';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {
  /*periodos: Periodo[] = [];
  carreras: CarreraFormComponent[] = [];
  periodo: Periodo = new Periodo();

  constructor(private periodoService: PeriodoService, private carreraService: CarreraFormService) { }
*/

  ngOnInit(): void {
    //this.loadPeriodos();
    //this.loadCarreras();
  }
/*
  loadPeriodos(): void {
    this.periodoService.getPeriodos().subscribe((data: Periodo[]) => {
      this.periodos = data;
    });
  }

  loadCarreras(): void {
    this.carreraService.getCarreras().subscribe((data: CarreraFormComponent[]) => {
      this.carreras = data;
    });
  }

  onSubmit(): void {
    if (this.periodo.id) {
      this.periodoService.updatePeriodo(this.periodo.id, this.periodo).subscribe(() => {
        this.loadPeriodos();
        this.periodo = new Periodo();
      });
    } else {
      this.periodoService.createPeriodo(this.periodo).subscribe(() => {
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

  getCarreraNombre(id: number): string {
    const carrera = this.carreras.find(c => c.id === id);
    return carrera ? carrera.nombre : '';
  }
    */
}
