import { Component } from '@angular/core';

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
  palabraUsuario: string = '';
}
