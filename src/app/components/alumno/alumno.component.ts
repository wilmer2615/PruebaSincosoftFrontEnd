import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno.model';
import { AlumnoService } from 'src/app/services/alumno.service';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent {

  listaAlumnos: any[] = [];
  form: FormGroup;
  id: number | undefined;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private _alumnoService: AlumnoService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.getAlumnos();
  }

  saveAlumno() {

    const alumno: any = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      edad: this.form.get('edad')?.value,
      direccion: this.form.get('direccion')?.value,
      telefono: this.form.get('telefono')?.value
    }

    if (this.id == undefined) {
      // Agragamos nuevo alumno 
      this._alumnoService.saveAlumno(alumno).subscribe(data => {
        this.toastr.success('El alumno fue registrado con exito!!!', 'Alumno Registrado!');
        this.getAlumnos();
        this.form.reset();
      }, error => {
        this.toastr.error("Uppsss, Ocurrio un error", "Error");
        console.log(error);
      });

    } else {
      //Editamos alumno
      alumno.id = this.id;

      //Editamos nueva tarjeta
      this._alumnoService.updateAlumno(this.id, alumno).subscribe(data => {
        this.form.reset();
        this.id = undefined;
        this.toastr.info('El alumno fue actualizado con exito!!!', 'Alumno Actualizado!');
        this.getAlumnos();
      }, error => {
        console.log(error);
      })
    }
  }

  getAlumnos() {
    this._alumnoService.getListAlumnos().subscribe(data => {
      this.listaAlumnos = data;
    }, error => {
      console.log(error);
    })
  }

  editAlumno(alumno: Alumno) {

    this.id = alumno.id;

    this.form.patchValue({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      edad: alumno.edad,
      direccion: alumno.direccion,
      telefono: alumno.telefono
    })
  }

  deleteAlumno(id: number) {
    this._alumnoService.deleteAlumno(id).subscribe(data => {
      this.toastr.error('El alumno fue eliminado con exito!!!', 'Alumno Eliminado!');
      this.getAlumnos();
    }, error => {
      console.log(error);
    })
  }

}
