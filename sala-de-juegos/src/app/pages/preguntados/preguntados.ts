import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { PreguntadosService } from '../../services/preguntados-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css'
})
export class Preguntados {
  preguntas: any[] = [];
  preguntaActual: any;
  opciones: string[] = [];
  indice: number = 0;
  puntaje: number = 0;
  juegoTerminado: boolean = false;
  categoriaSeleccionada: string | null = null;
  mensaje: string = '';
  opcionSeleccionada: string | null = null;
  respuestaCorrecta: string | null = null;
  bloquearOpciones: boolean = false;
  pagina: number = 1;

  tiempo: number = 0;
  private intervalo: any; 

  categorias: { key: string; label: string }[] = [
    { key: 'geography', label: 'Geografía' },
    { key: 'arts%26literature', label: 'Arte & Literatura' },
    { key: 'entertainment', label: 'Entretenimiento' },
    { key: 'science%26nature', label: 'Ciencia & Naturaleza' },
    { key: 'sports%26leisure', label: 'Deportes & Ocio' },
    { key: 'history', label: 'Historia' }
  ];

  constructor(
    private preguntadosService: PreguntadosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  seleccionarCategoria(categoriaKey: string) {
    this.categoriaSeleccionada = categoriaKey;
    this.indice = 0;
    this.puntaje = 0;
    this.juegoTerminado = false;
    this.preguntas = [];
    this.preguntaActual = null;
    this.opciones = [];
    this.mensaje = '';
    this.tiempo = 0;

    this.opcionSeleccionada = null;
    this.respuestaCorrecta = null;
    this.bloquearOpciones = false;


    clearInterval(this.intervalo);
    this.intervalo = setInterval(() => {
      if (!this.juegoTerminado) {
        this.tiempo++;
        this.cdr.detectChanges();
      }
    }, 1000);

    this.cargarPreguntas(categoriaKey);
  }

  cargarPreguntas(categoriaKey: string) {
    const page = Math.floor(Math.random() * 5) + 1;
    console.log(page)

    this.preguntadosService.getPreguntas(5, page, categoriaKey).subscribe({
      next: (data) => {
        this.preguntas = data.questions ?? data.results ?? data ?? [];
        if (this.preguntas.length > 0) {
          this.setPreguntaActual();
        } else {
          this.mensaje = 'No se recibieron preguntas';
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar preguntas:', err);
        this.mensaje = 'No se pudieron cargar las preguntas';
      }
    });
  }

  private setPreguntaActual() {
    this.preguntaActual = this.preguntas[this.indice];
    if (this.preguntaActual) {
      const todasOpciones = [
        ...this.preguntaActual.incorrectAnswers,
        this.preguntaActual.correctAnswers
      ];

      for (let i = todasOpciones.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [todasOpciones[i], todasOpciones[j]] = [todasOpciones[j], todasOpciones[i]];
      }

      this.opciones = todasOpciones;
    }
  }

  responder(opcion: string) {
    if (this.bloquearOpciones) return;
    this.bloquearOpciones = true;

    this.opcionSeleccionada = opcion;
    this.respuestaCorrecta = this.preguntaActual.correctAnswers;

    if (opcion === this.preguntaActual.correctAnswers) {
      this.puntaje++;
    }

    setTimeout(() => {
      this.indice++;

      if (this.indice >= this.preguntas.length) {
        this.juegoTerminado = true;
        this.mensaje = 'Juego terminado';
        clearInterval(this.intervalo);

        this.preguntadosService.guardarResultado({
          puntaje: this.puntaje,
          totalPreguntas: this.preguntas.length,
          categoria: this.categoriaSeleccionada ?? 'desconocida',
          tiempo: this.tiempo
        });

        this.cdr.detectChanges();
      } else {
        this.setPreguntaActual();
        this.opcionSeleccionada = null;
        this.respuestaCorrecta = null;
        this.bloquearOpciones = false;
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  reiniciarJuego() {
    this.indice = 0;
    this.puntaje = 0;
    this.juegoTerminado = false;
    this.mensaje = '';
    this.tiempo = 0;

    this.opcionSeleccionada = null;
    this.respuestaCorrecta = null;
    this.bloquearOpciones = false;

    clearInterval(this.intervalo);
    this.intervalo = setInterval(() => {
      if (!this.juegoTerminado) {
        this.tiempo++;
        this.cdr.detectChanges();
      }
    }, 1000);

    if (this.preguntas.length > 0) {
      this.setPreguntaActual();
      this.cdr.detectChanges();
    }
  }
}
