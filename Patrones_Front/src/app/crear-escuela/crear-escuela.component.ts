import { Component } from '@angular/core';
import { BackendService } from '../service/crearEscuela.service';

@Component({
  selector: 'app-escuela',
  templateUrl: './crear-escuela.component.html',
  styleUrls: ['./crear-escuela.component.css']
})

export class CrearEscuelaComponent {
  nombreInstitucion: string = ''; // Variable para almacenar el nombre
  file: File;

  constructor(private backendService: BackendService) { }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  enviarDatosAlBackend() {
    if (this.nombreInstitucion && this.file) {
      this.backendService.enviarDatos(this.nombreInstitucion, this.file).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
        },
        error => {
          console.error('Error al enviar los datos:', error);
        }
      );
    } else {
      console.error('Complete todos los campos.');
    }
  }
}