import { Component } from '@angular/core';
import { Carta } from '../../classes/carta';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayormenor.html',
  styleUrl: './mayormenor.css'
})
export class Mayormenor {
  mazo: Carta[] = [];
  cartaActual!: Carta;
  cartaSiguiente!: Carta;
  indice: number = 0;
  mensaje: string = '';
  aciertos: number = 0;
  juegoTerminado: boolean = false;

  ngOnInit() {
    this.inicializarMazo();
    this.mezclarMazo();
    this.reiniciarJuego();
  }

  inicializarMazo() {
    const palos = ["corazones", "treboles", "picas", "diamantes"];
    for (let palo of palos) {
      for (let valor = 1; valor <= 13; valor++) {
        this.mazo.push({
          valor,
          palo,
          imagen: `${valor}_${palo}.png`
        });
      }
    }
  }

  mezclarMazo() {
    this.mazo.sort(() => Math.random() - 0.5);
  }

  elegir(opcion: 'mayor' | 'menor') {
    if (this.indice + 1 >= this.mazo.length) {
      this.mensaje = "¡Fin del mazo!";
      this.juegoTerminado = true;
      return;
    }

    this.cartaSiguiente = this.mazo[++this.indice];

    if (
      (opcion === 'mayor' && this.cartaSiguiente.valor > this.cartaActual.valor) ||
      (opcion === 'menor' && this.cartaSiguiente.valor < this.cartaActual.valor)
    ) {
      this.aciertos++;
      this.cartaActual = this.cartaSiguiente;
    } else {
      this.cartaActual = this.cartaSiguiente;
      this.mensaje = `¡Perdiste!`;
      this.juegoTerminado = true;
    }
  }

  reiniciarJuego() {
    this.indice = 0;
    this.aciertos = 0;
    this.mensaje = '';
    this.juegoTerminado = false;
    this.mezclarMazo();
    this.cartaActual = this.mazo[this.indice];
  }
}