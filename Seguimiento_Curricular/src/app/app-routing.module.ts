import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { CarreraFormComponent } from './carrera-form/carrera-form.component';
import { CursosComponent } from './curso/curso.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { ActividadesComponent } from './actividades/actividades.component';

const routes: Routes = [
  { path: 'roles', component: RolesComponent },
  { path: '', redirectTo: '/roles', pathMatch: 'full' },
  { path: 'carreras', component: CarreraFormComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'periodos', component: PeriodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
