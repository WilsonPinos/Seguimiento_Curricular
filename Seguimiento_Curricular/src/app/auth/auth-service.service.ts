import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.baseUrl, { username, password }, { headers }).pipe(
      map(response => {
        // Suponiendo que la respuesta contiene el token
        localStorage.setItem('token', response.token);
        return response;
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
