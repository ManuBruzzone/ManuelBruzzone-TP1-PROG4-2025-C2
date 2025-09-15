import { inject, Injectable, OnInit } from '@angular/core';
import { Mensaje } from '../classes/mensajes';
import { Auth } from './auth';

@Injectable({
    providedIn: 'root',
    })
    export class Realtime {
    private sup = inject(Auth);

    public canal = this.sup.supabase.channel('table-db-changes');

    constructor() {}

    async traerTodosFijo(): Promise<Mensaje[]> {
        const { data, error } = await this.sup.supabase.from('chat').select('*');

        if (error) {
        return [];
        }
        return data as Mensaje[];
    }

    async crear(mensaje: string, usuario: string): Promise<void> {
        await this.sup.supabase.from('chat').insert({ mensaje: mensaje, usuario: usuario });
    }
}
