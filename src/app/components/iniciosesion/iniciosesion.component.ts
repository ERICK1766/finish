import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Router  } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para [(ngModel)]
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-iniciosesion',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent {

  nombre:string = '';
  contrasena:string = '';
  tipousuario:string = '';
  mensajeError = '';

  constructor(private authService: AuthService,private router: Router) {}
  
  iniciarSesion() {
    const usuario = {
      nombre: this.nombre,
      contrasena: this.contrasena,
      tipousuario: this.tipousuario
    };
  
    console.log('Datos enviados al backend:', usuario);
  
    this.authService.login(usuario).subscribe(
      (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
  
        // Ajustar para la estructura actual del backend
        if (respuesta && respuesta.usuario && respuesta.token) {
          console.log('Inicio de sesión exitoso:', respuesta.usuario);
  
          // Guardar el token en localStorage
          localStorage.setItem('token', respuesta.token);
  
          // Redirigir según el tipo de usuario
          switch (this.tipousuario) {
            case 'Presidente OTB':
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
              console.error('Tipo de usuario no válido:', this.tipousuario);
              this.mensajeError = 'Tipo de usuario desconocido.';
              break;
          }
        } else {
          console.error('Respuesta incompleta del servidor:', respuesta);
          this.mensajeError = 'Formato incorrecto en la respuesta del servidor.';
          alert(this.mensajeError);
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        this.mensajeError = 'Usuario o contraseña incorrectos.';
        alert(this.mensajeError);
      }
    );
  }
  
  
}
