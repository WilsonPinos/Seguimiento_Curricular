import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { RolesComponent } from './roles/roles.component';
import { CarreraFormComponent } from './carrera-form/carrera-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PeriodoComponent } from './periodo/periodo.component';
import { CursoService } from './curso/curso.service';
import { CursosComponent } from './curso/curso.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { DatePipe } from '@angular/common';
import { DirectorComponent } from './director/director.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RolesComponent,
    CarreraFormComponent,
    PeriodoComponent, 
    CursosComponent,
    ActividadesComponent,
    DirectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
