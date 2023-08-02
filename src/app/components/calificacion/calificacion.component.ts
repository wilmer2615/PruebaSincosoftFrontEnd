import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CalificacionService } from 'src/app/services/calificacion.service';

@Component({
  selector: 'app-calificacion',
  templateUrl: './calificacion.component.html',
  styleUrls: ['./calificacion.component.css']
})
export class CalificacionComponent {

  listMaterias: any = [];
  listAlumnos: any = [];
  listCalificaciones: any = [];

  constructor(private _alumnoService: AlumnoService, private toastr: ToastrService,
    private _calificacionService: CalificacionService) {

  }

  ngOnInit(): void {
    this.getAlumnos();
    this.getCalificaciones();
  }

  getAlumnos() {
    this._alumnoService.getListAlumnos().subscribe(data => {
      this.listAlumnos = data;
    }, error => {
      console.log(error);
    })
  }

  getCalificaciones() {

    this._calificacionService.getListCalificaciones().subscribe(data => {
      this.listCalificaciones = data;
    }, error => {
      console.log(error);
    })
  }

  deleteCalificacion(id: number) {
    this._calificacionService.deleteCalificacion(id).subscribe(data => {
      this.toastr.error('El alumno fue eliminado con exito!!!', 'Alumno Eliminado!');
      this.getCalificaciones();
    }, error => {
      console.log(error);
    })
  }


}
