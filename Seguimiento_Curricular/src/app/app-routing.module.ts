import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { CarreraFormComponent } from './carrera-form/carrera-form.component';
import { CursosComponent } from './curso/curso.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { DirectorComponent } from './director/director.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'; // Añadir esta línea

const routes: Routes = [
  { path: 'roles', component: RolesComponent },
  { path: 'carreras', component: CarreraFormComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'periodos', component: PeriodoComponent },
  { path: 'director', component: DirectorComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }, // Añadir esta línea
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
