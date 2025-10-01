import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PreguntadosService {
    private apiUrl = 'https://api.quiz-contest.xyz/questions';
    private apiKey = '$2b$12$HePjqzTlj.8U631RgndP9ePMwYKQXxopH78j0NC6blx.k3v9iZNpW';

    constructor(private http: HttpClient) {}

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
}