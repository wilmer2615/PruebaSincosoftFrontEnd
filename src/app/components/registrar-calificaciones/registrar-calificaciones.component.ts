import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Calificacion } from 'src/app/models/calificacion.model';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { MateriaService } from 'src/app/services/materia.service';
import { Alumno } from '../../models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MateriaCalificada } from 'src/app/models/materiaCalificada.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar-calificaciones',
  templateUrl: './registrar-calificaciones.component.html',
  styleUrls: ['./registrar-calificaciones.component.css']
})
export class RegistrarCalificacionesComponent {

  listMaterias: any[] = [];
  listAlumnos: any[] = [];
  listAnios: any[] = [];
  listMateriasCalificadas: any[] = [];
  listCalificaciones: any = [];

  alumno: any = {};
  anio: any;
  form: FormGroup;

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private _materiaService: MateriaService,
    private _calificacionService: CalificacionService, private toastr: ToastrService,
    private _alumnoService: AlumnoService) {

    this.form = this.fb.group({
      anio: ['', Validators.required],
    })
  }

  ngOnInit() {

    this.getAlumnos();
    this.getAlumno();
    this.getMaterias();
    this.getAnios();
  }

  getAlumnos() {
    this._alumnoService.getListAlumnos().subscribe(data => {
      this.listAlumnos = data;
      let id = this.getAlumno();
      this.listAlumnos.forEach(data => {
        if (data.id == id) {
          this.alumno = data.nombre + ' ' + data.apellido;
        }
      })
    }, error => {
      console.log(error);
    })
  }

  getAnios() {
    this._calificacionService.getListAnioAcademico().subscribe(data => {
      this.listAnios = data;
    }, error => {
      console.log(error);
    })
  }

  getAlumno(): number {
    let id = 0;
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    });
    return id;
  }

  getMaterias() {
    this._materiaService.getListMaterias().subscribe(data => {
      this.listMaterias = data;
      this.listMaterias.map(re => {
        re.checked = false;
        re.calificacion = '';
      })
    }, error => {
      console.log(error);
    })
  }

  checkAll(event: any) {
    this.listMaterias.forEach(element => element.checked = event);
  }

  isCheckedAll() {
    return this.listMaterias.every(re => re.checked);
  }

  save() {
    let array = this.listMaterias.filter(data => data.checked === true);
    array.forEach(data => {
      let materia: any = {};
      materia.idMateria = data.id;
      materia.calificacion = data.calificacion;
      this.listMateriasCalificadas.push(materia);
      if (data.checked == true && data.calificacion == undefined) {
        this.toastr.error('Todas las materias deben tener una calificacion!!!');
      }
    })
    let calificacion: Calificacion = {
      IdAlumno: this.getAlumno(),
      Materias: this.listMateriasCalificadas,
      IdAnioAcademico: this.getAnioAcademico(this.form.get('anio')?.value)
    }
    this._calificacionService.saveCalificacion(calificacion).subscribe(data => {
      this.toastr.success('Calificaciones registradas con exito!!!', 'Calificaciones Registradas!');
      this.listMaterias.forEach(element => {
        element.checked = false,
          element.calificacion = ''
      });
    });
    this.getCalificaciones();
  }

  getCalificaciones() {
    this._calificacionService.getListCalificaciones().subscribe(data => {
      this.listCalificaciones = data;
    }, error => {
      console.log(error);
    })
  }

  getAnioAcademico(anio: number): number {
    let anioSelect: number = 0;
    this.listAnios.forEach(data => {
      if (data.descripcion == anio) {
        anioSelect = data.id;
      }
    })
    return anioSelect;
  }

}
