import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Auth } from '../services/auth';

export const puedoSalirDelLoginYRegistroGuard: CanDeactivateFn<unknown> = (
    component,
    currentRoute,
    currentState,
    nextState
    ) => {
    const auth = inject(Auth);

    if (auth.usuarioActual()) {
        return true;
    }

    if (nextState.url === '/login' || nextState.url === '/registro') {
        return true;
    }

    return false;
};
