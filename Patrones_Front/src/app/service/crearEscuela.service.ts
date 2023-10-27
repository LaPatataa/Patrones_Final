import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  backendUrl = 'http://localhost:8080/cargar'; 

  constructor(private http: HttpClient) { }

  enviarDatos(nombreInstitucion: string, file: File) {
    const formData = new FormData();
    formData.append('nombreEscuela', nombreInstitucion);
    formData.append('Archivo', file, file.name);

    return this.http.post(this.backendUrl, formData);
  }
}