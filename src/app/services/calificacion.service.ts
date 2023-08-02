import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calificacion } from '../models/calificacion.model';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  private myAppUrl = "https://localhost:44365/";
  private myApi2Url = "api/AnioAcademico/";
  private myApiUrl = "api/Calificacion/";
  

  constructor(private http:HttpClient) { }


  getListAnioAcademico(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApi2Url);
  }
 
  saveCalificacion(calificacion: Calificacion): Observable<any>{
     var response = this.http.post(this.myAppUrl + this.myApiUrl, calificacion);     
      return response;
  }

  getListCalificaciones(): Observable<any> {
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteCalificacion(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }
}
