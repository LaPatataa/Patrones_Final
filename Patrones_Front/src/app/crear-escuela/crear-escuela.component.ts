import { Component } from '@angular/core';
import { BackendService } from '../service/crearEscuela.service';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../service/token.service';


@Component({
  selector: 'app-crear',
  templateUrl: './crear-escuela.component.html',
  styleUrls: ['./crear-escuela.component.css']
})

export class CrearEscuelaComponent {
  nombreInstitucion: string = ''; 
  file: File;
  isLogged = false;

  constructor(private backendService: BackendService, private tokenService: TokenService) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

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
    }else {
      console.error('Complete todos los campos.');
    }
  }
}