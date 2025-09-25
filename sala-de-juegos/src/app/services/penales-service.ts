import { Injectable } from '@angular/core';
import { Auth } from './auth';

@Injectable({
    providedIn: 'root'
})
    export class PenalesService {

        constructor(private auth: Auth) {

        }

        async guardarResultado(data: {
            goles: number,
            golesIzquierda: number,
            golesCentro: number,
            golesDerecha: number,
            intentos: number,
            atajadas: number
        }) {
            const usuario = this.auth.usuarioActual();

            if (!usuario) {
            console.error("Debes iniciar sesión para guardar resultados");
            return;
            }

            const { error } = await this.auth.supabase.from('penales_game').insert({
            user_email: usuario.email,
            goles: data.goles,
            goles_izquierda: data.golesIzquierda,
            goles_centro: data.golesCentro,
            goles_derecha: data.golesDerecha,
            intentos: data.intentos,
            atajadas: data.atajadas,
            });

            if (error) {
                console.error("Error al guardar penal:", error.message);
        }
    }

    async obtenerResultados() {
        const { data, error } = await this.auth.supabase
        .from('penales_game')
        .select('*')
        .order('goles', { ascending: false });

        if (error) {
        console.error("Error al obtener resultados de penales:", error.message);
        return [];
        }
        return data;
    }
}