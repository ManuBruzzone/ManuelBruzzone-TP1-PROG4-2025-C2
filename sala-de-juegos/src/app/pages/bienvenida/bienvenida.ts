import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { CardJuegoType } from '../../classes/card-juego';

@Component({
  selector: 'app-bienvenida',
  imports: [Card],
  templateUrl: './bienvenida.html',
  styleUrl: './bienvenida.css'
})
export class Bienvenida {
  cardAhorcado: CardJuegoType = {
    imagen: 'ahorcado.png',
    titulo: 'Ahorcado',
    descripcion: 'Juega el clasico juego del Ahorcado. Adivina o pierde!',
    url: '/ahorcado',
  }
  cardPreguntados: CardJuegoType = {
    imagen: 'preguntados.png',
    titulo: 'Preguntados',
    descripcion: 'Juega el clasico juego del Preguntados. Adivina o pierde!',
    url: '/preguntados',
  }
  cardMayorMenor: CardJuegoType = {
    imagen: 'mayormenor.png',
    titulo: 'Mayor o Menor',
    descripcion: 'Juega el clasico juego de Mayor o Menor. Adivina o pierde!',
    url: '/mayormenor',
  }
  cardPenales: CardJuegoType = {
    imagen: 'penales.png',
    titulo: 'Penales',
    descripcion: 'Juega mi juego propio Penales. Gana o pierde!',
    url: '/penales',
  }
}
