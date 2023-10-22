import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { LocalStorageService } from '../services/local-storage.service';

export const adminGuard: CanMatchFn = (route, segments) => {
	const router = inject(Router);
	const localStorageService = inject(LocalStorageService);
	const jwtService = inject(JwtService);

	const token = localStorageService.get('accessToken') as string;
	if (token === null)
		return router.navigate(['/login'])

	const isAdmin = jwtService.getRole(token);
	return isAdmin === 'admin' ? true : false;
};
