import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class ApiService {
    private http = inject(HttpClient);
    private apiUrl = 'https://api.github.com/users/';

    usuarioActual = signal<any>(null);

    traerUsuario(username: string) {
        const peticion: Observable<any> = this.http.get<any>(this.apiUrl + username);

        const suscripcion: Subscription = peticion.subscribe((respuesta) => {
        this.usuarioActual.set(respuesta);

        suscripcion.unsubscribe();
        });
    }
}