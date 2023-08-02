import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Profesor } from 'src/app/models/profesor.model';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent {

  listaProfesores: any[] = [];
  form: FormGroup;
  id: number | undefined;


  constructor(private fb: FormBuilder, private toastr: ToastrService, private _profesorService: ProfesorService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required]

    })
  }

  ngOnInit(): void {
    this.getProfesores();
  }

  saveAlumno() {

    const profesor: Profesor = {
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      edad: this.form.get('edad')?.value,
      direccion: this.form.get('direccion')?.value,
      telefono: this.form.get('telefono')?.value
    }

    if (this.id == undefined) {
      // Agragamos nuevo profesor 
      this._profesorService.saveProfesor(profesor).subscribe(data => {
        this.toastr.success('El profesor fue registrado con exito!!!', 'Profesor Registrado!');
        this.getProfesores();
        this.form.reset();
      }, error => {
        this.toastr.error("Uppsss, Ocurrio un error", "Error");
        console.log(error);
      });

    } else {
      //Editamos profesor
      profesor.id = this.id;

      this._profesorService.updateProfesor(this.id, profesor).subscribe(data => {
        this.form.reset();
        this.id = undefined;
        this.toastr.info('El profesor fue actualizado con exito!!!', 'Profesor Actualizado!');
        this.getProfesores();
      }, error => {
        console.log(error);
      })
    }
  }

  getProfesores() {
    this._profesorService.getListProfesores().subscribe(data => {
      this.listaProfesores = data;
    }, error => {
      console.log(error);
    })
  }

  editAlumno(profesor: Profesor) {

    this.id = profesor.id;

    this.form.patchValue({
      nombre: profesor.nombre,
      apellido: profesor.apellido,
      edad: profesor.edad,
      direccion: profesor.direccion,
      telefono: profesor.telefono
    })
  }

  deleteAlumno(id: number) {
    this._profesorService.deleteProfesor(id).subscribe(data => {
      this.toastr.error('El profesor fue eliminado con exito!!!', 'Profesor Eliminado!');
      this.getProfesores();
    }, error => {
      console.log(error);
    })
  }
}
