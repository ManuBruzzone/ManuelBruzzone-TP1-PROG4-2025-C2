import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const loginRegistroGuard: CanActivateFn = async (route, state) => {
    const auth = inject(Auth);
    const router = inject(Router);

    const { data } = await auth.supabase.auth.getSession();
    const user = data.session?.user ?? null;

    if (user) {
        console.log("Usuario ya logueado → redirigiendo a /bienvenida");
        return router.parseUrl('/bienvenida');
    }

    return true;
};