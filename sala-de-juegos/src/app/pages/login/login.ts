import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ FormsModule, RouterLink ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  protected authService = inject(Auth);
  protected router = inject(Router);

  async iniciarSesion() {
    const user = this.authService.usuarioActual(); // Signal

    if (user) {
      Swal.fire({
        title: 'Usted ya tiene una sesion activa',
        icon: 'warning',
        background: '#12093E',
        color: '#fff',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
    })
      return
  };

    const respuesta = await this.authService.iniciarSesion(this.email, this.password);

    if (respuesta && !respuesta.error) {
      this.router.navigate(['/bienvenida']);
      Swal.fire({
        title: 'Sesion iniciada con exito',
        icon: 'success',
        background: '#12093E',
        color: '#fff',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
    })
    }
  }

  accesoRapido() {
    this.email = 'prueba@prueba.com';
    this.password = 'Prueba123!'
  }

  accesoRapidoDos() {
    this.email = 'manubruzzone2@gmail.com';
    this.password = 'Manu123!'
  }
  
  accesoRapidoTres() {
    this.email = 'aguistin@utn-sistemas.com';
    this.password = 'Manu123!'
  }
}