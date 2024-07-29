import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cedula: string;
  password: string;
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.cedula, this.password).subscribe(success => {
      if (success) {
        const role = this.authService.role;
        if (role === '1') { // ID del rol "ADMIN"
          this.router.navigate(['/admin']);
        } else if (role === '2') { // ID del rol "DIRECTOR"
          this.router.navigate(['/director']);
        } else if (role === '3') { // ID del rol "TUTOR"
          this.router.navigate(['/tutor']);
        }
      } else {
        this.error = 'Invalid credentials';
      }
    });
  }
}
