import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  nombre = '';
  apellido = '';
  edad: any = '';
  email = '';
  password = '';
  repassword = '';

  mostrarPassword = false;

  protected authService = inject(Auth);
  protected router = inject(Router);

  async crearCuenta() {
    const user = this.authService.usuarioActual();

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
      });
      return;
    }

    if ( this.validacionesAuth()) {
      const respuesta = await this.authService.crearCuenta(
        this.nombre,
        this.apellido,
        this.edad,
        this.email,
        this.password
      );
      if (respuesta && !respuesta.error) {
        this.router.navigate(['/bienvenida']);
      }
      return;
    } else
      console.log("Error antes de entrar al auth")
  }
  
  validacionesAuth(): boolean {

    const nombreValidado = !/\d/.test(this.nombre) && !/[!@#$%^&*()`\-_=+\/\?.,<>;:]/.test(this.nombre) && this.nombre.length >= 3 && this.nombre.length <= 20;

    const apellidoValidado = !/\d/.test(this.apellido) && !/[!@#$%^&*()`\-_=+\/\?.,<>;:]/.test(this.apellido) && this.apellido.length >= 3 && this.apellido.length <= 20;

    const edadValidado = this.edad >= 18 && this.edad <= 99;

    const emailValidado = this.email.includes('@') && (this.email.includes('.com') || this.email.includes('.net') || this.email.includes('.org')) 

    const passwordValidado = /[!@#$%^&*()`\-_=+\/\?.,<>;:]/.test(this.password) && /\d/.test(this.password) && /[A-Z]/.test(this.password) && this.password.length >= 8 && !(this.password.includes(this.nombre) || this.password.includes(this.apellido))
  
    const repasswordValidado = this.password === this.repassword;

    return nombreValidado && apellidoValidado && edadValidado && emailValidado && passwordValidado && repasswordValidado;
  }

  validarPassword(): string[] {
    const errores: string[] = [];

    if (!/[!@#$%^&*()`\-_=+\/\?.,<>;:]/.test(this.password)) {
      errores.push("Debe incluir al menos un carácter especial");
    }
    if (!/\d/.test(this.password)) {
      errores.push("Debe incluir al menos un número");
    }
    if (!/[A-Z]/.test(this.password)) {
      errores.push("Debe incluir al menos una letra mayúscula");
    }
    if (this.password.length < 8) {
      errores.push("Debe tener al menos 8 caracteres");
    }
    if (
      this.password &&
      (this.password.toLowerCase().includes(this.nombre?.toLowerCase() || "") ||
        this.password.toLowerCase().includes(this.apellido?.toLowerCase() || ""))
    ) {
      errores.push("No puede contener tu nombre o apellido");
    }

    return errores;
  }
}
