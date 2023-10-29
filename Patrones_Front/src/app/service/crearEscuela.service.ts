import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  backendUrl = 'http://localhost:8080/excel/cargar'; 

  constructor(private http: HttpClient) { }

  enviarDatos(nombreInstitucion: string, file: File) {
    const formData = new FormData();
    formData.append('nombreEscuela', nombreInstitucion);
    formData.append('archivo', file, file.name);

    return this.http.post(this.backendUrl, formData)
    .pipe(
      catchError(error => {
        console.error('Ocurrió un error al enviar los datos:', error);
        return throwError(error);
      })
    );
}
  }