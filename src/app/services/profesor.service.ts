import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from '../models/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private myAppUrl = "https://localhost:44365/";
  private myApiUrl = "api/Profesor/";

  constructor(private http:HttpClient) { }


  getListProfesores(): Observable<any> {

    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteProfesor(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveProfesor(profesor : Profesor): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, profesor);
  }

  updateProfesor(id: number, profesor: Profesor): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, profesor);
  }
}
