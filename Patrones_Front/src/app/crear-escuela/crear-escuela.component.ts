import { Component } from '@angular/core';
import { BackendService } from '../service/crearEscuela.service';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../service/token.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear-escuela.component.html',
  styleUrls: ['./crear-escuela.component.css']
})

export class CrearEscuelaComponent {
  nombreInstitucion: string = ''; 
  file: File;
  isLogged = false;

  constructor(private backendService: BackendService, private tokenService: TokenService,private toastr: ToastrService,private router: Router,) { }

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
          this.toastr.success('Envio Correcto', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.router.navigate(['/pantalla-inicio']);
        },
        error => {
          this.toastr.error('Envio Incorrecto', 'Archivo con datos incorrectos', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
        }
      );
    }else {
      console.error('Complete todos los campos.');
    }
  }
}