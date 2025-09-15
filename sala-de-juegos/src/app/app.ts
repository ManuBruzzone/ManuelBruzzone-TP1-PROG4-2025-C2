import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';
import { Chat } from './components/chat/chat';
import { CommonModule } from '@angular/common';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Chat, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sala-de-juegos');

  protected authService = inject(Auth);

  mostrarChat: boolean = false;
  usuario: string = 'Invitado';

  iniciarSesion(){
    this.mostrarChat = false;
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.mostrarChat = false;
  }

  modificarChat() {
    this.mostrarChat = !this.mostrarChat;
    if (this.mostrarChat) {
      const user = this.authService.usuarioActual();
      this.usuario = user?.email ?? 'Invitado';
    }
  }
}
