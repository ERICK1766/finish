import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenidoregistro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bienvenidoregistro.component.html',
  styleUrls: ['./bienvenidoregistro.component.css'],
})

export class BienvenidoregistroComponent implements OnInit {
  eventos: any[] = [];
  user: any = null;

  constructor( private apiService: ApiService, private authService: AuthService, private router: Router ) {}


 

  irARegistroEvento() {
    this.router.navigate(['/registroevento1']);  
  }


  ngOnInit(): void {
    this.loadEventos();
  }


  async loadEventos() {
    try {
      this.eventos = await this.apiService.getEventosusuarionormal();
      if (this.eventos.length === 0) {
        console.warn('No hay eventos disponibles.');
      } else {
        console.log('Eventos cargados:', this.eventos);
      }
      
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      this.eventos = [];
    }
 }
}