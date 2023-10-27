import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  backendUrl = 'http://localhost:8080/cargar'; // URL del backend

  constructor(private http: HttpClient) { }

  enviarDatos(nombreInstitucion: string, file: File) {
    const formData = new FormData();
    formData.append('nombreInstitucion', nombreInstitucion);
    formData.append('file', file, file.name);

    return this.http.post(this.backendUrl, formData);
  }
}