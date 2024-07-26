import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../usuario-form/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  id: number = 0;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.id).subscribe(
      response => {
        console.log('Login exitoso', response);
        this.router.navigate(['/home']); // Redirige al home tras el login exitoso
      },
      error => {
        console.error('Error en el login', error);
      }
    );
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
