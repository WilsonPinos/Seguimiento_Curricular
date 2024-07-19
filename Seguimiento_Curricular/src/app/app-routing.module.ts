import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { CarreraFormComponent } from './carrera-form/carrera-form.component';

const routes: Routes = [
  { path: 'roles', component: RolesComponent },
  { path: '', redirectTo: '/roles', pathMatch: 'full' },
  { path: 'carreras', component: CarreraFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
