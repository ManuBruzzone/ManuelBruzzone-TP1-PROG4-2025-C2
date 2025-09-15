import { Injectable, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private url = 'https://pewadoczsatwjjrlzjru.supabase.co';
  private key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBld2Fkb2N6c2F0d2pqcmx6anJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3NDI0NjMsImV4cCI6MjA3MjMxODQ2M30.Bhzc-81gEyZuBS9_wFmGiJ6uGJ9w1wrvs9TGxC1Bip8';

  supabase: SupabaseClient<any, 'public', 'public', any, any>;

  public usuarioActual: WritableSignal<User | null> = signal<User | null>(null);

  constructor() {
    this.supabase = createClient(this.url, this.key);

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      console.log(session);
      this.usuarioActual.set(session !== null ? session.user : null);
    });
  }

  async iniciarSesion (email: string, password: string) {
    const respuesta = await this.supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (respuesta.error) {
      Swal.fire({
        title: 'Error al iniciar sesion',
        icon: 'error',
        text: 'Correo o contraseña invalido',
        background: '#12093E',
        color: '#fff',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
      });
      console.log(respuesta.error);
      switch (respuesta.error.message) {
        case 'Invalid credentials':
          console.log('Credenciales invalidas');
          break;
        default:
          console.log('Error descononcido');

      }
      return respuesta;
    }
    console.log(respuesta.data);
    return respuesta;
  }
  
  async crearCuenta(nombre: string, apellido: string, edad: number, email: string, password: string) {
    const respuesta = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nombre, apellido, edad },
      },
    });

    if (respuesta.error) {
      Swal.fire({
        title: 'Error al crear la cuenta',
        icon: 'error',
        text: 'El email ya esta en uso',
        background: '#12093E',
        color: '#fff',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
      });
      console.log(respuesta.error);
      return respuesta;
    } else {
      Swal.fire({
        title: 'Cuenta creada con exito',
        icon: 'success',
        background: '#12093E',
        color: '#fff',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
      });
    }

    const user = respuesta.data.user;
    if (user) {
      const { error } = await this.supabase.from('usuarios').insert({
        nombre,
        apellido,
        edad,
        email,
      });

      if (error) {
        console.error("Error al insertar en usuarios:", error.message);
      }
    }
    
    console.log(respuesta.data);
    return respuesta;
  }

  async cerrarSesion() {
    const { error } = await this.supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión:", error.message);
    } else {
      console.log("Sesión cerrada correctamente");
      Swal.fire({
        title: 'Se cerro la sesion',
        icon: 'success',
        background: '#12093E',
        color: '#fff',
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
        scrollbarPadding: false,
        heightAuto: false,
      });
    }
  }
}