import { Component, OnInit } from '@angular/core';
import { VinculacionService } from '../services/vinculacion.service';

@Component({
  selector: 'app-vincular-periodo-carrera',
  templateUrl: './vincular-periodo-carrera.component.html',
  styleUrls: ['./vincular-periodo-carrera.component.css']
})
export class VincularPeriodoCarreraComponent implements OnInit {
  periodos: any[] = [];
  carreras: any[] = [];
  selectedPeriodo: number;
  selectedCarreras: number[] = [];

  constructor(private vinculacionService: VinculacionService) {}

  ngOnInit() {
    this.loadPeriodos();
    this.loadCarreras();
  }

  loadPeriodos() {
    this.vinculacionService.getPeriodos().subscribe((data: any) => {
      console.log(data);
      this.periodos = data;
    });
  }

  loadCarreras() {
    this.vinculacionService.getCarreras().subscribe((data: any) => {
      console.log(data);
      this.carreras = data;
    });
  }

  vincular() {
    this.vinculacionService.vincular(this.selectedPeriodo, this.selectedCarreras).subscribe((response: any) => {
      alert('Vinculación realizada con éxito');
    });
  }
}
