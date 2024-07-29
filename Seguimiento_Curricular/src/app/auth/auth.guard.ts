import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole: 'ADMIN' | 'DIRECTOR' | 'TUTOR' = next.data['role'];
    const roleMapping: { [key in 'ADMIN' | 'DIRECTOR' | 'TUTOR']: string } = {
      'ADMIN': '1',
      'DIRECTOR': '2',
      'TUTOR': '3'
    };

    if (this.authService.isLoggedIn && this.authService.role === roleMapping[expectedRole]) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
