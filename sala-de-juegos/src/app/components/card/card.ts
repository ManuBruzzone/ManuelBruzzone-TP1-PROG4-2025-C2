import { Component, input, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CardJuegoType } from '../../classes/card-juego';
import { Auth } from '../../services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css'
})

export class Card {
  card = input<CardJuegoType>();

  private sup = inject(Auth);

  user = this.sup.usuarioActual();

  noEstaLogueado(): void{
    Swal.fire({
      title: 'Para poder jugar debe loguearse',
      icon: 'error',
      text: 'Inicie sesion y vuelva a intentar', 
      background: '#12093E',
      color: '#fff',
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
      scrollbarPadding: false,
      heightAuto: false,
    });
  }
}
