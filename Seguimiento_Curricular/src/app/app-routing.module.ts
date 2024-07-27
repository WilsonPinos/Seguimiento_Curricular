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
import { HomeComponent } from './home/home.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { VincularPeriodoCarreraComponent } from './vincular-periodo-carrera/vincular-periodo-carrera.component';
import { ActividadRelacionComponent } from './actividad-relacion/actividad-relacion.component';

const routes: Routes = [
  { path: 'roles', component: RolesComponent },
  { path: 'carreras', component: CarreraFormComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'periodos', component: PeriodoComponent },
  { path: 'director', component: DirectorComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: EditarUsuarioComponent },
  { path: 'vincular-periodo-carrera', component: VincularPeriodoCarreraComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'usuarios', component: EditarUsuarioComponent },
  { path: 'entregados', component: ActividadRelacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
