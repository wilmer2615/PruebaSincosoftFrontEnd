import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Materia } from 'src/app/models/materia.model';
import { MateriaService } from 'src/app/services/materia.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { Profesor } from '../../models/profesor.model';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent {


  listMaterias: any[] = [];
  listProfesores: any[] = [];
  form: FormGroup;
  id: number | undefined;


  constructor(private fb: FormBuilder, private toastr: ToastrService,
    private _materiaService: MateriaService,
    private _profesorService: ProfesorService) {

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      profesor: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getProfesores();
    this.getMaterias();
  }

  saveMateria() {
    
    const materia: Materia = {
      nombre: this.form.get('nombre')?.value,
      idProfesor: this.form.get('profesor')?.value
    }    
      // Agragamos nueva materia
      this._materiaService.saveMateria(materia).subscribe(data => {
        this.toastr.success('La materia fue registrada con exito!!!', 'Materia Registrada!');
        this.getMaterias();
        this.form.reset();
      }, error => {
        this.toastr.error("Uppsss, Ocurrio un error", "Error");
        console.log(error);
      });    
  }

  getMaterias() {
    this._materiaService.getListMaterias().subscribe(data => {
      this.listMaterias = data;
      this.listMaterias.forEach(materia => {
        let profesor = this.getNameProfesor(materia.idProfesor);        
        materia.nombreProfesor = profesor.nombre;
        materia.apellidoProfesor = profesor.apellido;        
      })
    }, error => {
      console.log(error);
    })
  }  

  deleteMateria(id: number) {
    this._materiaService.deleteMateria(id).subscribe(data => {
      this.toastr.error('La materia fue eliminada con exito!!!', 'Materia Eliminada!');
      this.getMaterias();
    }, error => {
      console.log(error);
    })
  }

  getProfesores() {
    this._profesorService.getListProfesores().subscribe(data => {
      this.listProfesores = data;
    }, error => {
      console.log(error);
    })
  }

  getNameProfesor(id: number) : Profesor {
   
    let profesor: any = {} ;
    this.listProfesores.forEach(element => {
      if (element.id == id) {
        profesor.nombre = element.nombre;
        profesor.apellido = element.apellido;
      }
    });
    return profesor;
  }
}
