import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const estaLogueadoGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Consulto sesión actual en Supabase
  const { data } = await auth.supabase.auth.getSession();
  const user = data.session?.user ?? null;

  if (user) {
    // ✅ Está logueado → lo dejo entrar
    return true;
  }

  // ❌ No está logueado → lo mando a login
  return router.parseUrl('/login');
};