import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router  } from '@angular/router';

import { FormsModule } from '@angular/forms'; // Importar FormsModule para [(ngModel)]
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registrogeneral',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './registrogeneral.component.html',
  styleUrls: ['./registrogeneral.component.css']
})

export class RegistrogeneralComponent 
{
  nombre: string = '';
  contrasena: string = '';
  email:string = '';
  numcontacto: number = 0;
  tipousuario: string = '';
  mensajeError = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrar() 
  {
    const usuarios = {
      nombre: this.nombre,
      contrasena: this.contrasena,
      email: this.email,
      numcontacto: this.numcontacto,
      tipousuario: this.tipousuario
    }; 

    this.authService.registrarusuario(usuarios).subscribe(
      (respuesta: any) => {
        console.log('Registro de usuario exitoso:', respuesta);
    
        // Almacenar token y usuario
        localStorage.setItem('token', respuesta.token);
        this.authService.setUsuario(respuesta.user); // Actualizar el usuario actual en el servicio
    
        // Redirigir según el tipo de usuario
        switch (this.tipousuario) {
          case 'Presidente OTB':
            this.router.navigate(['/bienvenidopresidente']);
            break;
          case 'Empresa':
            this.router.navigate(['/bienvenidopresidente']);
            break;
          case 'Usuario':
            this.router.navigate(['/home']);
            break;
          case 'Admin':
            this.router.navigate(['/bienvenidoadmin']);
            break;
          default:
            console.error('Tipo de usuario desconocido:', this.tipousuario);
            alert('Tipo de usuario no reconocido.');
        }
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        this.mensajeError = 'Datos incorrectos.';
        alert(this.mensajeError);
      }
    );
  }
} 