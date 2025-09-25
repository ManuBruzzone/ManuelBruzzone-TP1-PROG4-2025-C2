import { Injectable } from '@angular/core';
import { Auth } from './auth';

@Injectable({
    providedIn: 'root'
})

export class AhorcadoService {

    constructor(private auth: Auth) {
        
    }

    async guardarResultado(data: {
        palabra: string,
        aciertos: number,
        errores: number,
        tiempo: number,
        gano: boolean
    }) {
        const usuario = this.auth.usuarioActual();

        if (!usuario) {
        console.error("Debes iniciar sesión para guardar resultados");
        return;
        }

        const { error } = await this.auth.supabase.from('ahorcado_game').insert({
        user_email: usuario.email,
        palabra: data.palabra,
        aciertos: data.aciertos,
        errores: data.errores,
        tiempo: data.tiempo,
        gano: data.gano
        });

        if (error) {
        console.error("Error al guardar ahorcado:", error.message);
        }
    }
}