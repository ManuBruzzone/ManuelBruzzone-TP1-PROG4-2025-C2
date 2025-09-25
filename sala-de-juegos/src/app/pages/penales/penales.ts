import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { PenalesService } from '../../services/penales-service';

@Component({
  selector: 'app-penales',
  imports: [NgClass],
  templateUrl: './penales.html',
  styleUrl: './penales.css'
})
export class Penales {
  goles: number = 0;
  golesIzquierda: number = 0;
  golesCentro: number = 0;
  golesDerecha: number = 0;
  intentos: number = 0;
  intentosRestantes: number = 3;
  atajadas: number = 0;
  mensaje: string = '';
  mensajePerdiste: string = '';
  juegoTerminado: boolean = false;
  direcciones: string[] = ['izquierda', 'centro', 'derecha'];
  posicionArquero: string = 'centro';

  constructor(private penalesService: PenalesService) {}

  patear(direccion: string) {
    if (this.juegoTerminado) return;

    const arquero = this.direcciones[Math.floor(Math.random() * this.direcciones.length)];
    this.posicionArquero = arquero;

    if (direccion === arquero) {
      this.mensaje = `¡Atajó en la ${arquero}!`;
      this.atajadas++;
      this.intentosRestantes--;
    } else {
      this.goles++;
      if (direccion === 'izquierda') this.golesIzquierda++;
      if (direccion === 'centro') this.golesCentro++;
      if (direccion === 'derecha') this.golesDerecha++;

      this.mensaje = `¡GOOOL! El arquero se tiró a la ${arquero}.`;
    }

    this.intentos++;

    if (this.intentosRestantes === 0) {
      this.mensajePerdiste = `Juego terminado. Hiciste ${this.goles} goles.`;
      this.juegoTerminado = true;
      this.guardarResultado();
    }
  }

  async guardarResultado() {
    await this.penalesService.guardarResultado({
      goles: this.goles,
      golesIzquierda: this.golesIzquierda,
      golesCentro: this.golesCentro,
      golesDerecha: this.golesDerecha,
      intentos: this.intentos,
      atajadas: this.atajadas,
    });
  }

  reiniciarJuego() {
    this.goles = 0;
    this.golesIzquierda = 0;
    this.golesCentro = 0;
    this.golesDerecha = 0;
    this.intentos = 0;
    this.intentosRestantes = 3;
    this.atajadas = 0;
    this.mensaje = '';
    this.mensajePerdiste = '';
    this.juegoTerminado = false;
    this.posicionArquero = 'centro';
  }
}