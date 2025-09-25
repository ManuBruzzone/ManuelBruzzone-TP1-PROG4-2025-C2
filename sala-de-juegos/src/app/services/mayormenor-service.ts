import { Injectable } from '@angular/core';
import { Auth } from './auth';

@Injectable({
    providedIn: 'root'
})
export class MayorMenorService {

    constructor(private auth: Auth) {
        
    }

    async guardarResultado(data: {
        aciertos: number,
        gano: boolean
    }) {
        const usuario = this.auth.usuarioActual();

        if (!usuario) {
        console.error("Debes iniciar sesión para guardar resultados");
        return;
        }

        const { error } = await this.auth.supabase.from('mayormenor_game').insert({
        user_email: usuario.email,
        aciertos: data.aciertos,
        gano: data.gano
        });

        if (error) {
        console.error("Error al guardar mayor-menor:", error.message);
        }
    }
}
