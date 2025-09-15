import { Routes } from '@angular/router';
import { estaLogueadoGuard } from './guards/esta-logueado-guard';
import { puedoSalirDelLoginYRegistroGuard } from './guards/login-registro';
import { noEstaLogueadoGuard } from './guards/no-esta-logueado';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'bienvenida',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/login').then((archivo) => archivo.Login),
        canActivate: [noEstaLogueadoGuard]
    },
    {
        path: 'registro',
        loadComponent: () =>
            import('./pages/registro/registro').then((archivo) => archivo.Registro),
        canActivate: [noEstaLogueadoGuard]
    },
    {
        path: 'bienvenida',
        loadComponent: () =>
            import('./pages/bienvenida/bienvenida').then((archivo) => archivo.Bienvenida),
    },
    {
        path: 'quiensoy',
        loadComponent: () =>
            import('./pages/quiensoy/quiensoy').then((archivo) => archivo.Quiensoy),
    },
    {
        path: 'ahorcado',
        loadComponent: () =>
            import('./pages/ahorcado/ahorcado').then((archivo) => archivo.Ahorcado),
        canActivate: [estaLogueadoGuard],
    },
    {
        path: 'preguntados',
        loadComponent: () =>
            import('./pages/preguntados/preguntados').then((archivo) => archivo.Preguntados),
        canActivate: [estaLogueadoGuard],
    },
    {
        path: 'mayormenor',
        loadComponent: () =>
            import('./pages/mayormenor/mayormenor').then((archivo) => archivo.Mayormenor),
        canActivate: [estaLogueadoGuard],
    },
    {
        path: 'penales',
        loadComponent: () =>
            import('./pages/penales/penales').then((archivo) => archivo.Penales),
        canActivate: [estaLogueadoGuard],
    },
    {
        path: '**',
        loadComponent: () =>
            import('./pages/error/error').then((archivo) => archivo.Error),
    }
];
