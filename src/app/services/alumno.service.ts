import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private myAppUrl = "https://localhost:44365/";
  private myApiUrl = "api/Alumno/";

  constructor(private http:HttpClient) { }


  getListAlumnos(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteAlumno(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveAlumno(alumno: Alumno): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, alumno);
  }

  updateAlumno(id: number, alumno: Alumno): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, alumno);
  }
}
