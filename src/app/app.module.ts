import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



//Rutas
import { AppRoutingModule } from './app-routing.module';

//Services
import {AlumnoService} from  './services/alumno.service';
import {ProfesorService} from  './services/profesor.service';



//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { ProfesorComponent } from './components/profesor/profesor.component';
import { MateriaComponent } from './components/materia/materia.component';
import { CalificacionComponent } from './components/calificacion/calificacion.component';
import { RegistrarCalificacionesComponent } from './components/registrar-calificaciones/registrar-calificaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AlumnoComponent,
    ProfesorComponent,
    MateriaComponent,
    CalificacionComponent,
    RegistrarCalificacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    AlumnoService,
    ProfesorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
