import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagoreserva',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagoreserva.component.html',
  styleUrls: ['./pagoreserva.component.css']
})
export class PagoreservaComponent {
  mostrarExito(event: Event) {
    event.preventDefault(); // Evita el envío normal del formulario

    // Mostrar el modal de éxito
    const modal = document.getElementById('modal-exito')!;
    modal.style.display = 'flex';

    // Redirigir a la página de inicio después de 3 segundos
    setTimeout(() => {
      window.location.href = '/home';
    }, 3000);
  }

  toggleVisibility() {
    const input = document.getElementById('codigoTarjeta') as HTMLInputElement;
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }
}
