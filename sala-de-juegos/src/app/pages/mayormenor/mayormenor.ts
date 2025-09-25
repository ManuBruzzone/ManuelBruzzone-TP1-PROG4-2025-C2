import { Component } from '@angular/core';
import { Carta } from '../../classes/carta';
import { MayorMenorService } from '../../services/mayormenor-service';

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
  ordenPalos: string[] = ["corazones", "diamantes", "treboles", "picas"];
  
  constructor(private mayorMenorService: MayorMenorService) {
    
  }

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
      this.guardarResultado(true);
      return;
    }

    this.cartaSiguiente = this.mazo[++this.indice];

    const resultado = this.compararCartas(this.cartaSiguiente, this.cartaActual);

    if (
      (opcion === 'mayor' && resultado > 0) ||
      (opcion === 'menor' && resultado < 0)
    ) {
      this.aciertos++;
      this.cartaActual = this.cartaSiguiente;
    } else {
      this.cartaActual = this.cartaSiguiente;
      this.mensaje = "¡Perdiste!";
      this.guardarResultado(false);
      this.juegoTerminado = true;
    }
  }

  private compararCartas(c1: Carta, c2: Carta): number {
    if (c1.valor > c2.valor) return 1;
    if (c1.valor < c2.valor) return -1;

    const i1 = this.ordenPalos.indexOf(c1.palo);
    const i2 = this.ordenPalos.indexOf(c2.palo);

    if (i1 > i2) return 1;
    if (i1 < i2) return -1;
    return 0;
  }


  private guardarResultado(gano: boolean) {
    this.mayorMenorService.guardarResultado({
      aciertos: this.aciertos,
      gano: gano
    });
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