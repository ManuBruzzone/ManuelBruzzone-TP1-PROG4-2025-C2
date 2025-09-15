import { Component, inject, signal, ViewChild, ElementRef } from '@angular/core';
import { Mensaje } from '../../classes/mensajes';
import { Realtime } from '../../services/realtime';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, NgClass, DatePipe],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  realtime = inject(Realtime);
  private sup = inject(Auth);

  mensajes = signal<Mensaje[]>([]);
  msj = '';

  usuario: string = 'Invitado';

  @ViewChild('mensajesContainer') mensajesContainer!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.actualizarUsuario();

    this.realtime.traerTodosFijo().then((array) => {
      this.mensajes.set(array);

      setTimeout(() => this.scrollToBottom(), 0);
    });

    this.realtime.canal
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat',
        },
        (payload) => {
          this.mensajes.update((valorAnterior) => [...valorAnterior, payload.new as Mensaje]);

          setTimeout(() => this.scrollToBottom(), 0);
        }
      )
      .subscribe();
  }

  enviarMensaje() {
    this.actualizarUsuario();

    if (!this.msj.trim()) return;

    this.realtime.crear(this.msj, this.usuario);
    this.msj = '';
  }

  private actualizarUsuario() {
    const user = this.sup.usuarioActual();
    this.usuario = user?.email ?? 'Invitado';
  }

  private scrollToBottom() {
    const container = this.mensajesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
  }
}

