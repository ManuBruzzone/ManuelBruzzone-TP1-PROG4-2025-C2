import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth';

@Injectable({
    providedIn: 'root'
})
export class PreguntadosService {
    private apiUrl = 'https://api.quiz-contest.xyz/questions';
    private apiKey = '$2b$12$HePjqzTlj.8U631RgndP9ePMwYKQXxopH78j0NC6blx.k3v9iZNpW';

    constructor(private http: HttpClient, private auth: Auth) {}

    getPreguntas(limit: number = 5, page: number = 1, category?: string, format?: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': this.apiKey
        });

        let url = `${this.apiUrl}?limit=${limit}&page=${page}`;
        
        if (category) {
            url += `&category=${(category)}`;
        }

        return this.http.get(url, { headers });
    }

    async guardarResultado(data: {
        puntaje: number,
        totalPreguntas: number,
        categoria: string
        tiempo: number
    }) {
        const usuario = this.auth.usuarioActual();

        if (!usuario) {
            console.error("Debes iniciar sesión para guardar resultados");
            return;
        }

        const { error } = await this.auth.supabase.from('preguntados_game').insert({
            user_email: usuario.email,
            puntaje: data.puntaje,
            total_preguntas: data.totalPreguntas,
            categoria: data.categoria,
            tiempo: data.tiempo
        });

        if (error) {
            console.error("Error al guardar resultado de Preguntados:", error.message);
        }
    }

    async obtenerResultados() {
        const { data, error } = await this.auth.supabase
            .from('preguntados_game')
            .select('*')
            .order('puntaje', { ascending: false });

        if (error) {
            console.error("Error al obtener resultados de Preguntados:", error.message);
            return [];
        }
        return data;
    }
}