import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { MateriaComponent } from './components/materia/materia.component';
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { RegistrarCalificacionesComponent } from './components/registrar-calificaciones/registrar-calificaciones.component';

const routes: Routes = [

  {path:'alumno', component: AlumnoComponent},
  {path:'profesor', component: ProfesorComponent},
  {path:'materia', component: MateriaComponent},
  {path:'registrarCalificacion/:id', component: RegistrarCalificacionesComponent},
  {path:'calificacion', component: CalificacionComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'alumno'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
