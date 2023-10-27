import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  backendUrl = 'http://localhost:8080/exel/cargar'; 

  constructor(private http: HttpClient) { }

  enviarDatos(nombreInstitucion: string, file: File) {
    const formData = new FormData();
    formData.append('nombreEscuela', nombreInstitucion);
    formData.append('Archivo', file, file.name);

    return this.http.post(this.backendUrl, formData)
    .pipe(
      catchError(error => {
        // Manejar errores
        console.error('Ocurrió un error al enviar los datos:', error);
        return throwError(error);
      })
    );
}
  }