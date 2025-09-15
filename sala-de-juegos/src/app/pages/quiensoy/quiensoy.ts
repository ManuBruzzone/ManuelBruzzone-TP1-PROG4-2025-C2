import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api-service';

@Component({
  selector: 'app-quiensoy',
  imports: [FormsModule],
  templateUrl: './quiensoy.html',
  styleUrl: './quiensoy.css'
})

export class Quiensoy {
  apiService = inject(ApiService);

  nombre: string = 'ManuBruzzone';
  
  ngOnInit() {
    this.apiService.traerUsuario(this.nombre);
  }
}
