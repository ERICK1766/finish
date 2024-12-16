import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Router} from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para [(ngModel)]
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registroevento',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './registroevento.component.html',
  styleUrls: ['./registroevento.component.css']
})
export class RegistroeventoComponent {

  nombre: string = '';
  tipo_evento: string = '';
  descripcion: string = '';
  id_usuario: string = ''; 
  id_espacio: string = '';   
  fecha_evento :string = '';
  capacidad_personas: number = 0;
  hora_inicio: number = 0;
  hora_fin: number = 0;
  tipo_pago: string = '';
  mensajeError = '';

  constructor(private authService: AuthService, private router: Router) {}

  registrarevento() 
  {

    const token = localStorage.getItem('token'); // Obtener el token
  console.log('Token actual:', token); // Verificar el token en la consola
  console.log('Tipo de Pago seleccionado:', this.tipo_pago);

    const evento = {
      nombre: this.nombre,
      tipo_evento: this.tipo_evento,
      descripcion: this.descripcion, 
      id_usuario: this.id_usuario,
      id_espacio: this.id_espacio,  
      fecha_evento: this.fecha_evento,
      capacidad_personas: this.capacidad_personas, 
      hora_inicio: this.hora_inicio,
      hora_fin: this.hora_fin,
      tipo_pago: this.tipo_pago

      
    }; 

    console.log('Datos enviados:', evento); // Verificar los datos enviados
    console.log('Datos enviados:', evento); // Verificar los datos enviados

    this.authService.registrarevento(evento).subscribe(
      (respuesta) => {
        console.log('Registro de evento exitoso:', respuesta);
        switch (this.tipo_pago) {
          case 'Qr':
            this.router.navigate(['/qrreserva']);
            break;
          case 'Tarjeta':
            this.router.navigate(['/pagoreserva']);
            break;
          default:
            console.error('Tipo de Pago desconocido:', this.tipo_pago);
            alert('Tipo de Pago no reconocido.');
        }
      },
      (error) => {
        console.error('Error al registro evento:', error);
        this.mensajeError = 'Usuario o contraseña incorrectos.';
        alert(this.mensajeError);
      }
    );
  }
}
