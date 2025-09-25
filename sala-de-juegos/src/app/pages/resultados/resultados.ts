import { Component } from '@angular/core';
import { PenalesService } from '../../services/penales-service';
import { MayorMenorService } from '../../services/mayormenor-service';
import { AhorcadoService } from '../../services/ahorcado-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resultados',
  imports: [CommonModule, FormsModule],
  templateUrl: './resultados.html',
  styleUrl: './resultados.css'
})
export class Resultados {

  juegoSeleccionado: string = '';

  penalesResultados: any[] = [];
  mayormenorResultados: any[] = [];
  ahorcadoResultados: any[] = [];
  preguntadosResultados: any[] = [];

  constructor(
    private penalesService: PenalesService,
    private mayorMenorService: MayorMenorService,
    private ahorcadoService: AhorcadoService,
  ) {}

  ngOnInit(){
    this.cargar()
  }
  
  async cargar() {
    this.penalesResultados = await this.penalesService.obtenerResultados();
    this.mayormenorResultados = await this.mayorMenorService.obtenerResultados();
    this.ahorcadoResultados = await this.ahorcadoService.obtenerResultados();
  }

  seleccionarJuego(juego: string) {
    this.juegoSeleccionado = juego;
  }
}