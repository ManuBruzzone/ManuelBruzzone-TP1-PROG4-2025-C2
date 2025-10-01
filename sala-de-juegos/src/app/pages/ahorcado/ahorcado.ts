import { Component, ChangeDetectorRef } from '@angular/core';
import { AhorcadoService } from '../../services/ahorcado-service';

@Component({
  selector: 'app-ahorcado',
  imports: [],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css'
})
export class Ahorcado {
  palabras: string[] = [
    "ASADO", "MATE", "EMPANADA", "MILANESA", "CHORIPAN", "FERNET", "ALFAJOR", "TANGO",
    "FUTBOL", "RIVER", "BOCA", "GIMNASIA", "INDEPENDIENTE", "SANLORENZO", "TUCUMAN",
    "SALTA", "JUJUY", "CHACO", "FORMOSA", "MENDOZA", "NEUQUEN", "CHUBUT", "SANTAFE",
    "CORRIENTES", "MISIONES", "CATAMARCA", "SANTIAGO", "SANJUAN", "LARIOJA", "COLECTIVO",
    "SUBTE", "BOLICHE", "CHE", "PAN", "QUESO", "LECHE", "GALLETAS", "FUTBOL", "AMIGO",
    "FIESTA", "PLAYA", "MONTAÑA", "AUTO", "CASA", "PERRO", "GATO", "LIBRO", "ESCUELA",
    "TRABAJO", "CIUDAD"
  ];

  palabraElejida: string = '';
  palabraUsuario: string[] = [];
  vidas: number = 6;
  letrasProbadas: string[] = [];
  mensaje: string = '';
  imagenes: string[] = [
    '/ahorcado0.png',
    '/ahorcado1.png',
    '/ahorcado2.png',
    '/ahorcado3.png',
    '/ahorcado4.png',
    '/ahorcado5.png',
    '/ahorcado6.png'
  ];
  letraAcertada: string[] = [];
  letraErrada: string[] = [];
  tiempo: number = 0;
  errores: number = 0;
  private intervalo: any;

  constructor(private ahorcadoService: AhorcadoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(){
    this.iniciarJuego();
  }

  ngOnDestroy() {
    clearInterval(this.intervalo);
  }

  iniciarJuego() {
    this.palabraElejida = this.getPalabra();
    this.palabraVaciaInicial();
    this.tiempo = 0;

    clearInterval(this.intervalo);
    this.intervalo = setInterval(() => {
      if (!this.mensaje) {
        this.tiempo++;
        this.cdr.detectChanges();
      }
    }, 1000);
  }

  getPalabra(): string {
    return this.palabras[Math.floor(Math.random() * this.palabras.length)];
  }

  palabraVaciaInicial(){
    this.palabraUsuario = Array(this.palabraElejida.length).fill('_');
  }

  aprietoLetra(letra: string, event: Event) {
    if (this.letrasProbadas.includes(letra)) return;
    this.letrasProbadas.push(letra);

    const buttonElement = event.target as HTMLButtonElement;
    buttonElement.setAttribute('disabled', '');

    let acierto = false;
    for (let i = 0; i < this.palabraElejida.length; i++) {
      if (this.palabraElejida[i] === letra) {
        this.palabraUsuario[i] = letra;
        acierto = true;
        
        if (!this.letraAcertada.includes(letra)) {
          this.letraAcertada.push(letra);
        }
      }
    }

    if (!acierto) {
      this.vidas--;
      this.letraErrada.push(letra);
      this.errores =+ 1;
    }

    this.checkEstado();
  }

  checkEstado(){
    if (this.palabraUsuario.join('') === this.palabraElejida) {
      this.mensaje = "ganaste";
      clearInterval(this.intervalo);

      this.guardarResultado(true);

    } else if (this.vidas <= 0) {
      this.mensaje = "Perdiste. La palabra era: "+ this.palabraElejida;
      clearInterval(this.intervalo);

      this.guardarResultado(false);
    }
  }

  private guardarResultado(gano: boolean) {
    this.ahorcadoService.guardarResultado({
      palabra: this.palabraElejida,
      aciertos: this.letraAcertada.length,
      errores: this.letraErrada.length,
      tiempo: this.tiempo,
      gano: gano
    });
  }

  reiniciarJuego(){
    this.vidas = 6;
    this.letrasProbadas = [];
    this.mensaje = '';
    this.letraAcertada= [];
    this.letraErrada= [];
    this.iniciarJuego();
    this.errores = 0;
  }
}