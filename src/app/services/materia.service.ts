import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {

  private myAppUrl = "https://localhost:44365/";
  private myApiUrl = "api/Materia/";

  constructor(private http:HttpClient) { }


  getListMaterias(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteMateria(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveMateria(materia: Materia): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl, materia);
  }

  
}
