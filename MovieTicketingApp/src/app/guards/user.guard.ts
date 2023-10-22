import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { JwtService } from '../services/jwt.service';

export const userGuard: CanActivateFn = (route, state) => {
	const router = inject(Router);
	const localStorageService = inject(LocalStorageService);
	const jwtService = inject(JwtService);

	const token = localStorageService.get('accessToken') as string;
	if (token === null)
		return router.navigate(['/login'])

	const isExpired = jwtService.isTokenExpired(token);

	return isExpired ? router.navigate(['/login']) : true;
};
