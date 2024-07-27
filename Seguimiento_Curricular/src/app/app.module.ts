import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
import { AdminComponent } from './admin/admin.component';
import { DatePipe } from '@angular/common';
import { ActividadRelacionComponent } from './actividad-relacion/actividad-relacion.component';


@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    CarreraFormComponent,
    CursosComponent,
    PeriodoComponent,
    ActividadesComponent,
    DirectorComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UsuarioFormComponent,
    EditarUsuarioComponent,
    VincularPeriodoCarreraComponent,
    AdminComponent,
    ActividadRelacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
