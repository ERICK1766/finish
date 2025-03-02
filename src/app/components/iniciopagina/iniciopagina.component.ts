import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-iniciopagina',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './iniciopagina.component.html',
  styleUrls: ['./iniciopagina.component.css']
})

export class IniciopaginaComponent implements OnInit {
  eventos: any[] = [];
  error: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadEventos();
  }

  async loadEventos() {
    try {
      this.eventos = await this.apiService.getEventosusuarionormal();
      console.log('Eventos cargados:', this.eventos); // Verifica si los datos son correctos
      if (this.eventos.length === 0) {
        console.warn('No hay eventos disponibles.');
      }
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      this.eventos = [];
    }
  }
  
  

  getEventImage(tipo_evento: string): string {
    switch (tipo_evento) {
      case 'MedioAmbientales':
        return 'assets/medioambiental.png';
      case 'Cultural':
        return 'assets/cultural.jpg';
      case 'Comida':
        return 'assets/comida.jpg';
      case 'Politica':
        return 'assets/politica.jpg';
      default:
        return 'assets/6-de-agosto-de-Bolivia-2-715x400.jpg';
      }
   }

}
