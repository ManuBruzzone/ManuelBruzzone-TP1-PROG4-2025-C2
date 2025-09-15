import { inject, Injectable } from '@angular/core';
import { Auth } from './auth';
import { Usuario } from '../classes/usuarios';

@Injectable({
    providedIn: 'root',
    })
    export class DbUsuarios {
    private sS = inject(Auth);

    async crearUsuario(usuario: Usuario): Promise<any | null> {
        const resultado = await this.sS.supabase.from('usuarios').insert(usuario);

        return resultado.error?.message;
    }
}