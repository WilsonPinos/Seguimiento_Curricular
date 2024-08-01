import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';

// Importación de todos los componentes
import { RolesComponent } from './roles/roles.component';
import { CarreraFormComponent } from './carrera-form/carrera-form.component';
import { CursosComponent } from './curso/curso.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { DirectorComponent } from './director/director.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { VincularPeriodoCarreraComponent } from './vincular-periodo-carrera/vincular-periodo-carrera.component';
import { AdminComponent } from './admin/admin.component';
import { ActividadRelacionComponent } from './actividad-relacion/actividad-relacion.component';
import { tutorComponent } from './Tutor/tutor.component';
import { DocenteComponent } from './docente/docente.component';

@NgModule({
  declarations: [
    AppComponent,
    RolesComponent,
    CarreraFormComponent,
    CursosComponent,
    PeriodoComponent,
    ActividadesComponent,
    DirectorComponent,
    LoginComponent,
    HomeComponent,
    UsuarioFormComponent,
    EditarUsuarioComponent,
    VincularPeriodoCarreraComponent,
    AdminComponent,
    ActividadRelacionComponent,
    tutorComponent,
    DocenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    IonicModule.forRoot({})
  ],
  providers: [
    DatePipe,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
